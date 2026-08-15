let isSending = false;

// ======================================
// Chat History
// ======================================

function loadHistory() {

    const history = JSON.parse(localStorage.getItem("chatHistory")) || [];

    const panel = document.getElementById("historyPanel");

    if (!panel) return;

    // Remove previous history items
    panel.querySelectorAll(".history-item").forEach(item => item.remove());

    history.forEach(message => {

        const item = document.createElement("div");
        item.className = "history-item";
        item.innerText = message;

        item.onclick = () => {
            document.getElementById("prompt").value = message;
            document.getElementById("prompt").focus();
        };

        panel.appendChild(item);

    });

}

function saveHistory(message) {

    let history = JSON.parse(localStorage.getItem("chatHistory")) || [];

    // Avoid duplicate consecutive entries
    if (history[0] !== message) {
        history.unshift(message);
    }

    // Keep only latest 50
    history = history.slice(0, 50);

    localStorage.setItem("chatHistory", JSON.stringify(history));

    loadHistory();

}

function clearHistory() {

    localStorage.removeItem("chatHistory");

    loadHistory();

}

// ======================================
// Send Message
// ======================================

async function send() {

    if (isSending) return;

    const messageInput = document.getElementById("prompt");
    const message = messageInput.value.trim();

    if (message === "") {
        return;
    }

    // Save message to history
    saveHistory(message);

    isSending = true;

    const chat = document.getElementById("chat");

    // User Message
    chat.innerHTML += `
        <div class="user-message">
            <strong>You</strong>
            <p>${message.replace(/\n/g, "<br>")}</p>
        </div>
    `;

    // Clear input
    messageInput.value = "";

    // Reset textarea height
    messageInput.style.height = "60px";

    chat.scrollTop = chat.scrollHeight;

    try {

        const response = await fetch("/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: message
            })
        });

        if (!response.ok) {
            throw new Error("Server returned " + response.status);
        }

        const data = await response.json();

        const html = marked.parse(data.response);

        chat.innerHTML += `
            <div class="ai-message">
                ${html}
            </div>
        `;

        // Highlight code
        document.querySelectorAll("pre code").forEach((block) => {
            hljs.highlightElement(block);
        });

        // Add Copy Buttons
        decorateCodeBlocks();

        chat.scrollTop = chat.scrollHeight;

    } catch (error) {

        chat.innerHTML += `
            <div class="ai-message error">
                <strong>Error:</strong> ${error.message}
            </div>
        `;

        chat.scrollTop = chat.scrollHeight;

    } finally {

        isSending = false;

        messageInput.focus();

    }

}

// ======================================
// Code Block Decoration
// ======================================

function decorateCodeBlocks() {

    document.querySelectorAll("pre").forEach((pre) => {

        if (pre.parentElement.classList.contains("code-wrapper")) {
            return;
        }

        const code = pre.querySelector("code");

        if (!code) return;

        let language = "Code";

        code.classList.forEach(cls => {

            if (cls.startsWith("language-")) {
                language = cls.replace("language-", "");
            }

        });

        const wrapper = document.createElement("div");
        wrapper.className = "code-wrapper";

        const header = document.createElement("div");
        header.className = "code-header";

        const title = document.createElement("span");
        title.className = "code-language";
        title.textContent = language;

        const button = document.createElement("button");
        button.className = "copy-btn";
        button.innerHTML = "📋 Copy";

        button.onclick = async () => {

            await navigator.clipboard.writeText(code.innerText);

            button.innerHTML = "✔ Copied";

            setTimeout(() => {
                button.innerHTML = "📋 Copy";
            }, 2000);

        };

        header.appendChild(title);
        header.appendChild(button);

        pre.parentNode.insertBefore(wrapper, pre);

        wrapper.appendChild(header);
        wrapper.appendChild(pre);

    });

}

// ======================================
// Auto Resize + Enter to Send
// ======================================

document.addEventListener("DOMContentLoaded", () => {

    const promptBox = document.getElementById("prompt");

    function autoResize() {

        promptBox.style.height = "60px";

        promptBox.style.height =
            Math.min(promptBox.scrollHeight, 150) + "px";

    }

    promptBox.addEventListener("input", autoResize);

    promptBox.addEventListener("keydown", function (event) {

        if (event.key === "Enter" && !event.shiftKey) {

            event.preventDefault();

            send();

        }

    });

    autoResize();

    // Load saved history
    loadHistory();

});