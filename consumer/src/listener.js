class Listener {
  constructor(songsService, mailSender) {
    this._songsService = songsService;
    this._mailSender = mailSender;

    this.listen = this.listen.bind(this);
  }

  async listen(message) {
    try {
      const { playlistId, targetEmail } = JSON.parse(message.content.toString());

      const songs = await this._songsService.getSongsFromPlaylist(playlistId);

      const playlist = {
        id: songs[0]?.playlist_id,
        name: songs[0]?.playlist_name,
        songs: [],
      };
      songs.forEach((song) => {
        if (song.song_id) {
          playlist.songs.push({
            id: song.song_id,
            title: song.title,
            performer: song.performer,
          });
        }
      });

      //   console.log('Query result:', songs);
      //   console.log('playlistId :', playlistId);
      //   console.log('playlistId :', playlist);

      const result = await this._mailSender.sendEmail(
        targetEmail,
        JSON.stringify({ playlist: playlist }),
      );
      console.log(result);
    } catch (error) {
      console.error('Gagal mengirim email:', error);
    }
  }
}

export default Listener;
