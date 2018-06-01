
var XMLParser = require('react-xml-parser');

export default class MLBGamedayApi {

  constructor() { }

  // Formats a URL for a particular day. Month should be 1-indexed...
  static getDayURL(year, month, day) {
    // Convert the month/day to two-digit format...
    if (month < 10) { month = "0" + month; }
    if (day < 10) { day = "0" + day; }

    return `${MLBGamedayApi.BaseURL}/components/game/mlb/year_${year}/month_${month}/day_${day}/`;
  }

  // Gets a list of games for the given day. Month should be 1-indexed...
  static getListOfGamesForDay(year, month, day) {
    var epgURL = MLBGamedayApi.getDayURL(year, month, day) + "epg.xml";
    return fetch(epgURL)
      .then(function(response) { return response.text(); })
      .then(function(text) { return MLBGamedayApi.parseXML(text) })
      .then(function(data) {
        var games = data.getElementsByTagName("game");
        var urls = games.map(function(game) {
          var url = game.attributes["game_data_directory"];
          var awayTeamID = game.attributes["away_file_code"];
          var homeTeamID = game.attributes["home_file_code"];
          var awayTeamName = game.attributes["away_team_name"];
          var homeTeamName = game.attributes["home_team_name"];

          return { 
            url: url, 
            key: url,
            awayTeamID: awayTeamID,
            homeTeamID: homeTeamID,
            awayTeamName: awayTeamName,
            homeTeamName: homeTeamName,
          };
        });

        return Promise.resolve(urls);
      })
  }

  // Gets data for a specific game. URL is in format returned from getListOfGamesForDay()
  static getGameData(gameURL) {
    const url = `${MLBGamedayApi.BaseURL}${gameURL}/linescore.json`;
    return fetch(url)
      .then(function(response) { return response.json(); })
      .then(function(data) {
        if (!data || !data.data || !data.data.game) { 
          return Promise.resolve(null);
        }        

        // Gather data...
        var homeTeamRuns = data.data.game["home_team_runs"];
        var awayTeamRuns = data.data.game["away_team_runs"];
        var homeTeamID = data.data.game["home_file_code"];
        var awayTeamID = data.data.game["away_file_code"];
        var homeTeamName = data.data.game["home_team_name"];
        var awayTeamName = data.data.game["away_team_name"];
        var homeWins = data.data.game["home_win"];
        var awayWins = data.data.game["away_win"];
        var homeLosses = data.data.game["home_loss"];
        var awayLosses = data.data.game["away_loss"];

        // This is for boxscore.json

        /*
        if (!data || !data.data || !data.data.boxscore || !data.data.boxscore.linescore) {
          return Promise.resolve(null);
        }

        var homeTeamRuns = data.data.boxscore.linescore["home_team_runs"];
        var awayTeamRuns = data.data.boxscore.linescore["away_team_runs"];
        var homeTeamName = data.data.boxscore["home_fname"];
        var awayTeamName = data.data.boxscore["away_fname"];
        var homeWins = data.data.boxscore["home_wins"];
        var awayWins = data.data.boxscore["away_wins"];
        var homeLosses = data.data.boxscore["home_loss"];
        var awayLosses = data.data.boxscore["away_loss"];
        */

        // Put into object...
        var obj = {
          key: gameURL,
          url: gameURL,
          home_team_runs: homeTeamRuns,
          away_team_runs: awayTeamRuns,
          home_fname: homeTeamName,
          away_fname: awayTeamName,
          home_wins: homeWins,
          away_wins: awayWins,
          home_loss: homeLosses,
          away_loss: awayLosses
        };

        // Return object...
        return Promise.resolve(obj);
      })
      .catch(function(error) { console.log(error); });
  }

  static getVideoData(gameURL) {
    const url = `${MLBGamedayApi.BaseURL}${gameURL}/media/mobile.xml`;
    return fetch(url)
      .then(function(response) { return response.text(); })
      .then(function(text) { 
        text = text.split("/>").join("></keyword>");
        return MLBGamedayApi.parseXML(text); 
      })
      .then(function(data) {
          var media = data.getElementsByTagName("media");
          media = media.filter(function(m) { return m.attributes["type"] == "video"; });

          var videoData = media.map(function(m) {
            // Get bigblurb...
            var bigblurb = m.getElementsByTagName("bigblurb");
            bigblurb = (bigblurb.length > 0)
              ? bigblurb[0].value
              : "";

            // Get the video url...
            var urls = m.getElementsByTagName("url");
            urls = urls.filter(function(url) {
              return url.attributes["playback-scenario"] == "FLASH_1200K_640X360";
            });

            var videoURL = (urls.length > 0)
              ? urls[0].value
              : "";

            var id = m.attributes["id"]

            return {
              id: id,
              bigblurb: bigblurb,
              videoURL: videoURL,
            };
          });
          
          return Promise.resolve(videoData);
      });
  }

  // Gets all game data for a particular day. Month should be 1-indexed...
  static getAllGameDataForDay(year, month, day) {
    return MLBGamedayApi.getListOfGamesForDay(year, month, day)
      .then(function(dayGames) {
        const gameDataPromises = dayGames.map(function(dayGame) {
          return MLBGamedayApi.getGameData(dayGame.url);
        });

        return Promise.all(gameDataPromises);
      });
  }

  static parseXML(s) {
    var xml = new XMLParser().parseFromString(s);
    return Promise.resolve(xml);
  }
}

MLBGamedayApi.BaseURL = "https://gd2.mlb.com";