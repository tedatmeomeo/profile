document.addEventListener('DOMContentLoaded', (event) => {
    const textElement = document.getElementById("welcome-text");
    const text = "bbi em la aii?";
    let index = 0;

    // Hiệu ứng hiện từng chữ
    function typeText() {
        textElement.textContent = text.slice(0, index + 1);
        index = (index + 1) % text.length;
        setTimeout(typeText, 200);
    }

    typeText();

    // Tự động phát nhạc nền và chuyển bài khi hết
    const audioPlayer = document.getElementById("audio-player");
    const playlist = [ 'otothaycau.mp3' , 'anhchanggiamnoilinhtinh.mp3', 'chieuhomay.mp3'];
    let currentTrack = 0;

    function loadTrack(track) {
        audioPlayer.src = track;
        audioPlayer.play().catch(error => {
            console.log("Error playing audio:", error);
            // Nếu trình duyệt chặn phát tự động, yêu cầu người dùng tương tác
            if (!document.getElementById('play-button')) {
                document.body.insertAdjacentHTML('beforeend', '<div id="play-button" style="position: fixed; bottom: 20px; left: 20px; padding: 10px; background: #fff; color: #000; border: 1px solid #000; cursor: pointer;">Nhấn để phát nhạc</div>');
                document.getElementById('play-button').addEventListener('click', () => {
                    audioPlayer.play().catch(error => console.log("Error playing audio after user interaction:", error));
                    document.getElementById('play-button').remove(); // Xóa nút sau khi nhạc bắt đầu
                });
            }
        });
    }

    loadTrack(playlist[currentTrack]);

    audioPlayer.addEventListener('ended', function() {
        currentTrack = (currentTrack + 1) % playlist.length; // Chuyển sang bài tiếp theo
        loadTrack(playlist[currentTrack]); // Tải bài hát tiếp theo từ playlist
    });
});