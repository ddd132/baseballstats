const playerStats = {};

function inputname() {
  const playerName = document.getElementById('playerName').value;
  if (!playerName) return;
  document.getElementById('currentPlayer').innerText = playerName;
  document.getElementById('statsOptions').style.display = 'block';
  if (!playerStats[playerName]) {
    playerStats[playerName] = {
      singles: 0,
      doubles: 0,
      triples: 0,
      homeRuns: 0,
      strikeouts: 0,
      walks: 0,
      sacrificeFlies: 0,
      sacrificeBunts: 0,
      interference: 0,
      outs: 0
    };
  }
}

function addStat() {
  const playerName = document.getElementById('currentPlayer').innerText;
  const choice = document.getElementById('statchosing').value;
  switch (parseInt(choice)) {
    case 1:
      playerStats[playerName].singles++;
      break;
    case 2:
      playerStats[playerName].doubles++;
      break;
    case 3:
      playerStats[playerName].triples++;
      break;
    case 4:
      playerStats[playerName].homeRuns++;
      break;
    case 5:
      playerStats[playerName].strikeouts++;
      break;
    case 6:
      playerStats[playerName].walks++;
      break;
    case 7:
      playerStats[playerName].sacrificeFlies++;
      break;
    case 8:
      playerStats[playerName].sacrificeBunts++;
      break;
    case 9:
      playerStats[playerName].interference++;
      break;
    case 10:
      playerStats[playerName].outs++;
      break;
    default:
      alert('Invalid choice. Try again.');
  }
  updatePlayerStatsTable();
}

function doneInput() {
  document.getElementById('statsOptions').style.display = 'none';
  updatePlayerStatsTable();
}

function queryStats() {
  const playerName = document.getElementById('queryPlayerName').value;
  if (!playerStats[playerName]) {
    alert('Player not found.');
    return;
  }

  document.getElementById('queriedPlayer').innerText = playerName;
  const stats = playerStats[playerName];
  const atBats = stats.singles + stats.doubles + stats.triples + stats.homeRuns + stats.strikeouts + stats.outs;
  const hits = stats.singles + stats.doubles + stats.triples + stats.homeRuns;
  const plateAppearances = atBats + stats.walks + stats.sacrificeFlies + stats.interference;
  const totalBases = stats.singles + 2 * stats.doubles + 3 * stats.triples + 4 * stats.homeRuns;
  const onBasePercentage = plateAppearances > 0 ? (hits + stats.walks + stats.interference) / plateAppearances : 0;
  const sluggingPercentage = atBats > 0 ? totalBases / atBats : 0;
  const ops = onBasePercentage + sluggingPercentage;

  document.getElementById('atBats').innerText = 'At Bats: ' + atBats;
  document.getElementById('onBasePercentage').innerText = 'On-Base Percentage: ' + onBasePercentage.toFixed(3);
  document.getElementById('sluggingPercentage').innerText = 'Slugging Percentage: ' + sluggingPercentage.toFixed(3);
  document.getElementById('ops').innerText = 'OPS: ' + ops.toFixed(3);
  document.getElementById('displayStats').style.display = 'block';
}

function updatePlayerStatsTable() {
  const tableBody = document.getElementById('statsTableBody');
  tableBody.innerHTML = '';
  for (const playerName in playerStats) {
    const stats = playerStats[playerName];
    const atBats = stats.singles + stats.doubles + stats.triples + stats.homeRuns + stats.strikeouts + stats.outs;
    const hits = stats.singles + stats.doubles + stats.triples + stats.homeRuns;
    const plateAppearances = atBats + stats.walks + stats.sacrificeFlies + stats.interference;
    const totalBases = stats.singles + 2 * stats.doubles + 3 * stats.triples + 4 * stats.homeRuns;
    const onBasePercentage = plateAppearances > 0 ? (hits + stats.walks + stats.interference) / plateAppearances : 0;
    const sluggingPercentage = atBats > 0 ? totalBases / atBats : 0;
    const ops = onBasePercentage + sluggingPercentage;

    const row = document.createElement('tr');
    row.innerHTML = `
                <td>${playerName}</td>
                <td>${stats.singles}</td>
                <td>${stats.doubles}</td>
                <td>${stats.triples}</td>
                <td>${stats.homeRuns}</td>
                <td>${stats.strikeouts}</td>
                <td>${stats.walks}</td>
                <td>${stats.sacrificeFlies}</td>
                <td>${stats.sacrificeBunts}</td>
                <td>${stats.interference}</td>
                <td>${stats.outs}</td>
                <td>${atBats}</td>
                <td>${onBasePercentage.toFixed(3)}</td>
                <td>${sluggingPercentage.toFixed(3)}</td>
                <td>${ops.toFixed(3)}</td>
            `;
    tableBody.appendChild(row);
  }
  document.getElementById('playerStatsTable').style.display = 'block';
}