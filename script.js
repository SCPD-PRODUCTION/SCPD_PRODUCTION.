/* ================= FIREBASE CONFIG ================= */
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

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const analytics = firebase.analytics();
const auth = firebase.auth();
const db = firebase.database();


/* ================= SIDEBAR ================= */
let sidebarOpen = false;

function toggleSidebar() {
    sidebarOpen = !sidebarOpen;
    document.getElementById("sidebar").style.left = sidebarOpen ? "0" : "-250px";
}


/* ================= LOGIN RENDER ================= */
function renderLogin() {
    document.getElementById("authArea").innerHTML =
        `<button onclick="loginGoogle()">Login Google</button>`;
}

function renderLogout() {
    document.getElementById("authArea").innerHTML =
        `<button onclick="logout()">Logout</button>`;
}


/* ================= LOGIN GOOGLE ================= */
function loginGoogle() {
    var provider = new firebase.auth.GoogleAuthProvider();

    auth.signInWithPopup(provider)
        .then((result) => {
            const user = result.user;

            // simpan user di database
            db.ref("users/" + user.uid).set({
                name: user.displayName,
                email: user.email,
                photo: user.photoURL
            });

            renderLogout();
            alert("Login berhasil: " + user.displayName);
        })
        .catch((error) => {
            alert("Error: " + error.message);
        });
}


/* ================= LOGOUT ================= */
function logout() {
    auth.signOut().then(() => {
        renderLogin();
        openScreen('default');
        alert("Logout berhasil!");
    });
}


/* ================= CEK LOGIN STATE ================= */
auth.onAuthStateChanged(user => {
    if (user) renderLogout();
    else renderLogin();
});


/* ================= PAGE SWITCHING ================= */
function openScreen(screen) {
    let html = "";

    // UPSCALE PHOTO
    if (screen === "upscale") {
        html = `
            <div class="screenContainer">
                <h2>Upscale Photo HD</h2>
                <p>Upload foto resolusi rendah:</p>
                <input type="file"><br>
                <button>Proses Foto</button>
            </div>
        `;
    }

    // YT MP3
    else if (screen === "ytmp3") {
        html = `
            <h2>YouTube → MP3</h2>
            <input type="text" placeholder="Masukkan link YouTube"><br>
            <button>Download MP3</button>
        `;
    }

    // YT MP4
    else if (screen === "ytmp4") {
        html = `
            <h2>YouTube → MP4</h2>
            <input type="text" placeholder="Masukkan link YouTube"><br>
            <button>Download MP4</button>
        `;
    }

    // TIKTOK
    else if (screen === "tiktok") {
        html = `
            <h2>TikTok Downloader</h2>
            <input type="text" placeholder="Masukkan link TikTok"><br>
            <button>Download</button>
        `;
    }

    // INSTAGRAM
    else if (screen === "instagram") {
        html = `
            <h2>Instagram Downloader</h2>
            <input type="text" placeholder="Masukkan link Instagram"><br>
            <button>Download</button>
        `;
    }

    // SPOTIFY
    else if (screen === "spotify") {
        html = `
            <h2>Spotify Downloader</h2>
            <input type="text" placeholder="Masukkan link Spotify"><br>
            <button>Download</button>
        `;
    }

    // DEFAULT
    else {
        html = `<h2>Selamat datang di SCPD_PRODUCTION</h2>`;
    }

    document.getElementById("content").innerHTML = html;
}


/* LOAD DEFAULT PAGE */
openScreen('default');
