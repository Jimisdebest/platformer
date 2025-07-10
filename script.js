// Simpele spike-detectie
function checkSpikeCollision(player, spikes) {
  for (let spike of spikes) {
    if (player.x < spike.x + spike.width &&
        player.x + player.width > spike.x &&
        player.y < spike.y + spike.height &&
        player.y + player.height > spike.y) {
      player.isDead = true;
    }
  }
}
