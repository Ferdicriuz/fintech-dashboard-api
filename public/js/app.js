const token = localStorage.getItem("token");
const msg = document.getElementById("msg");
const BASE_URL = "http://localhost:5000"; // <-- your backend

/* ======================
   SIGNUP
====================== */
const signupForm = document.getElementById("signupForm");
if (signupForm) {
  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");

    const res = await fetch(`${BASE_URL}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: nameInput.value,
        email: emailInput.value,
        password: passwordInput.value
      })
    });

    const data = await res.json();
    msg.innerText = data.message || "Signup successful";

    if (res.ok) window.location.href = "/login.html";
  });
}

/* ======================
   LOGIN
====================== */
const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

//     const emailInput = document.getElementById("email").value;
//     const passwordInput = document.getElementById("password").value;

//     const res = await fetch(`${BASE_URL}/api/auth/login`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         email: emailInput,
//         password: passwordInput
//       })
//     });

//     const data = await res.json();

//     if (res.ok && data.token) {
//       localStorage.setItem("token", data.token);
//       window.location.href = "/dashboard.html";
//     } else {
//       alert(data.message || "Login failed");
//     }
//   });
// }

const email = document.getElementById("email").value;
const password = document.getElementById("password").value;

try {
  const res = await fetch(`${BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("Login failed:", res.status, text);
    return;
  }

      localStorage.setItem("token", data.token);
      window.location.href = "/dashboard.html";

     } catch (err) {
      console.error("Fetch error:", err);
      msg.innerText = "Server error";
    }
  });
}


/* ======================
   DASHBOARD
====================== */

const userInfo = document.getElementById("userInfo");
if (userInfo) {
  if (!token) window.location.href = "/login.html";

  const img = document.getElementById("profileImage");
const noImg = document.getElementById("noImage");

  fetch (`${BASE_URL}/api/auth/me`, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  })
    .then(res => res.json())
    .then(data => {
      userInfo.innerText = JSON.stringify(data, null, 2);

      if (data.profileImage) {
        img.src =`http://localhost:5000${data.profileImage}`;
        img.style.display = "block";
        noImg.style.display = "none";
      }

    });
}

const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("token");
    window.location.href = "/login.html";
  });
}


/* ======================
   TRANSACTION
====================== */
const txnForm = document.getElementById("txnForm");
if (txnForm) {
  if (!token) window.location.href = "/login.html";

  txnForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const res = await fetch(`${BASE_URL}/api/transactions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        amount: Number(amount.value),
        type: type.value,
        description: description.value
      })
    });

    const data = await res.json();
    msg.innerText = data.message || "Transaction successful";
  });
}


const transactionsBox = document.getElementById("transactions");

if (transactionsBox) {
  fetch("/api/transactions", {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  })
    .then(res => res.json())
    .then(data => {
      transactionsBox.innerText = JSON.stringify(data, null, 2);
    });}
