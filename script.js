/* =====================
       FIREBASE
===================== */
const firebaseConfig = {
    apiKey: "AIzaSyC5gAbdlbVL3t6oreb_ZZhAUT1YJVTKwPU",
    authDomain: "scpd-production.firebaseapp.com",
    databaseURL: "https://scpd-production-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "scpd-production",
    storageBucket: "scpd-production.firebasestorage.app",
    messagingSenderId: "72136560829",
    appId: "1:72136560829:web:1c14d8087f9c3b88ade7d4",
    measurementId: "G-LGXCFVNFTH"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();


/* =====================
       LOGIN UI
===================== */
function showLoginBtn() {
    document.getElementById('authArea').innerHTML =
        `<button class="login-btn" onclick="loginGoogle()">Login Google</button>`;
}

function showLogoutBtn() {
    document.getElementById('authArea').innerHTML =
        `<button class="logout-btn" onclick="logout()">Logout</button>`;
}

function loginGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();

    auth.signInWithPopup(provider)
        .then(res => {
            showLogoutBtn();
            alert("Login berhasil: " + res.user.displayName);
        })
        .catch(err => {
            alert("Login gagal: " + err.message);
        });
}

function logout() {
    auth.signOut().then(() => {
        showLoginBtn();
        openScreen('home');
        alert("Logout berhasil");
    });
}

auth.onAuthStateChanged(user => {
    if (user) showLogoutBtn();
    else showLoginBtn();
});


/* =====================
      SIDEBAR TOGGLE
===================== */
function toggleSidebar() {
    document.getElementById("sidebar").classList.toggle("open");
}


/* =====================
      PAGE SWITCHING
===================== */
function openScreen(screen) {

    let html = "";

    // HOME
    if (screen === "home") {
        html = `
            <h2>Selamat datang di SCPD_PRODUCTION</h2>
            <p>Pilih fitur dari menu kiri.</p>
        `;
    }

    // UPSCALE
    if (screen === "upscale") {
        html = `
            <h2>Upscale / Photo HD</h2>
            <p>Upload gambar dan nanti server akan memproses menjadi HD.</p>
        `;
    }


    /* YOUTUBE */
    if (screen === "ytmp3") {
        html = `
            <h2>Download MP3 YouTube</h2>
            <input class="tool-input" type="text" placeholder="Masukkan link YouTube">
            <button class="tool-btn">Download MP3</button>
        `;
    }

    if (screen === "ytmp4") {
        html = `
            <h2>Download MP4 YouTube</h2>
            <input class="tool-input" type="text" placeholder="Masukkan link YouTube">
            <button class="tool-btn">Download MP4</button>
        `;
    }


    /* TIKTOK */
    if (screen === "tiktokmp3") {
        html = `
            <h2>Download TikTok MP3</h2>
            <input class="tool-input" type="text" placeholder="Masukkan link TikTok">
            <button class="tool-btn">Download MP3</button>
        `;
    }

    if (screen === "tiktokmp4") {
        html = `
            <h2>Download TikTok MP4</h2>
            <input class="tool-input" type="text" placeholder="Masukkan link TikTok">
            <button class="tool-btn">Download MP4</button>
        `;
    }


    /* INSTAGRAM */
    if (screen === "igmp3") {
        html = `
            <h2>Download Instagram MP3</h2>
            <input class="tool-input" type="text" placeholder="Masukkan link Instagram">
            <button class="tool-btn">Download MP3</button>
        `;
    }

    if (screen === "igmp4") {
        html = `
            <h2>Download Instagram MP4</h2>
            <input class="tool-input" type="text" placeholder="Masukkan link Instagram">
            <button class="tool-btn">Download MP4</button>
        `;
    }


    /* SPOTIFY */
    if (screen === "spotify") {
        html = `
            <h2>Download Spotify</h2>
            <input class="tool-input" type="text" placeholder="Masukkan link Spotify">
            <button class="tool-btn">Download MP3</button>
        `;
    }

    document.getElementById("content").innerHTML = html;
}
