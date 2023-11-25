import { useEffect, useState } from "react";
import { getDatabase, push, ref, set, onChildAdded ,  off} from "firebase/database";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import "../App.css";

const Messege=()=> {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();

  const googleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        setUser({ name: result.user.displayName, email: result.user.email });
        console.log(token, user);
      })
      .catch((error) => {
        console.error("Sign-in error:", error);
      });
      
  };

  const [user, setUser] = useState("");
  const [chats, setChats] = useState([]);
  const [msg, setMsg] = useState("");

  const db = getDatabase();
  const chatListRef = ref(db, "chats");
  let chatListener;

  const updateHeight = () => {
    const el = document.getElementById("chat");
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  };

  useEffect(() => {
    onChildAdded(chatListRef, (data) => {
      
      setChats((chats) => {
        console.log([...chats, data.val()]);
        return  [...chats, data.val()]
      });
     
      setTimeout(() => {
        updateHeight();
      }, 100);
    });
    return () => {
      setChats([])
      if (chatListener) {
        off(chatListRef, "child_added", chatListener);
      }
    };
  }, []);


  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log("User:", user);
      if (user) {
        setUser({ name: user.displayName, email: user.email });
      } else {
        setUser(""); // Clear user data
        setChats([]); // Clear chats
      }
    });
  }, []);
  

  const sendChat = () => {
    const chatRef = push(chatListRef);
    set(chatRef, {
      user,
      message: msg,
    });
    setMsg("");
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setUser("");
        setChats(false);
      })
      .catch((error) => {
        console.error("Logout error:", error);
      });
  };
  return (
    <div>
      {user.email ? null : (
        <div>
          <button onClick={(e) => {googleLogin();}}>Google SignIn</button>
        </div>
      )}
      {user.email ? (
        <div>
          <h3>User: {user.name}</h3>
          <div id="chat" className="chat-container">
            {chats.map((c, i) => (
              <div
                key={i}
                className={`container ${
                  c.user.email === user.email ? "me" : ""
                }`}
              >
                <p className="chatbox">
                  <strong>{c.user.name}: </strong>
                  <span>{c.message}</span>
                </p>
              </div>
            ))}
          </div>
          <div className="btm">
            <input
              type="text"
              onInput={(e) => setMsg(e.target.value)}
              value={msg}
              placeholder="enter your chat"
            ></input>
            <button onClick={(e) => sendChat()}>
              <i className="fa fa-paper-plane" aria-hidden="true"></i>
            </button>
            <button onClick={handleLogout}>Logout</button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Messege;
