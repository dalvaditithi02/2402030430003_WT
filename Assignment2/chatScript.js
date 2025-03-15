let step = 0; // Track conversation step

function sendMessage() {
    const inputField = document.getElementById("user-input");
    const message = inputField.value.trim().toLowerCase(); // Convert input to lowercase for consistency

    if (message === "") return;

    const chatBox = document.getElementById("chat-box");

    // Append user's message
    const userMessage = document.createElement("div");
    userMessage.className = "chat-message user";
    userMessage.innerHTML = `<span>${message}</span>`;
    chatBox.appendChild(userMessage);

    inputField.value = "";

    setTimeout(() => {
        let botResponse = "";
        let images = [];

        if (step === 0) {
            // First step: Greet the user and ask for their name
            botResponse = "Hello! Welcome to Fashion Aura. What's your name?";
            step = 1;
        } else if (step === 1) {
            // Second step: Ask for outfit preference
            botResponse = `Nice to meet you, ${message.charAt(0).toUpperCase() + message.slice(1)}! What type of outfit do you prefer? (Casual, Formal, Party, Traditional)`;
            step = 2;
        } else if (step === 2) {
            // Third step: Provide outfit suggestions
            if (message.includes("casual")) {
                botResponse = "Great choice! Here are some casual outfit suggestions:";
                images = ["Images/casual01.jpg", "Images/casual02.jpg", "Images/casual03.jpg"];
            } else if (message.includes("formal")) {
                botResponse = "Elegant! Here are some formal outfit suggestions:";
                images = ["Images/formal01.jpg", "Images/formal02.jpg", "Images/formal03.jpg"];
            } else if (message.includes("party")) {
                botResponse = "Stylish pick! Here are some party outfit suggestions:";
                images = ["Images/party01.png", "Images/party02.webp", "Images/party03.jpg"];
            } else if (message.includes("traditional")) {
                botResponse = "Classic choice! Here are some traditional outfit suggestions:";
                images = ["Images/traditional01.webp", "Images/traditional02.webp", "Images/traditional03.jpg"];
            } else {
                botResponse = "I didn't get that! Please type 'Casual', 'Formal', 'Party', or 'Traditional' to get outfit suggestions.";
                step = 2; // Keep asking for outfit preference
            }

            if (images.length > 0) {
                step = 3; // Move to the next step for another suggestion
            }
        } else if (step === 3) {
            // Ask if the user wants another suggestion
            if (message.includes("yes")) {
                botResponse = "Great! Which other outfit type would you like to explore? (Casual, Formal, Party, Traditional)";
                step = 2; // Allow the user to pick another category
            } else if (message.includes("no")) {
                botResponse = "Alright! Have a great day! 😊";
                step = 4; // End conversation
            } else {
                botResponse = "Please type 'Yes' if you want another suggestion or 'No' to exit.";
                step = 3; // Keep asking until the user responds correctly
            }
        }

        // Append bot's response
        const botMessage = document.createElement("div");
        botMessage.className = "chat-message bot";
        botMessage.innerHTML = `<img src="Images/Logo.PNG" class="bot-icon"><span>${botResponse}</span>`;
        chatBox.appendChild(botMessage);

        // Display outfit images if available
        if (images.length > 0) {
            const outfitImages = document.createElement("div");
            outfitImages.className = "outfit-images";

            images.forEach(src => {
                let img = document.createElement("img");
                img.src = src;
                outfitImages.appendChild(img);
            });

            chatBox.appendChild(outfitImages);

            // Ask if the user wants another suggestion
            setTimeout(() => {
                const followUpMessage = document.createElement("div");
                followUpMessage.className = "chat-message bot";
                followUpMessage.innerHTML = `<img src="Images/Logo.PNG" class="bot-icon"><span>Do you want another outfit suggestion? (Yes/No)</span>`;
                chatBox.appendChild(followUpMessage);
            }, 1000);
        }

        chatBox.scrollTop = chatBox.scrollHeight;
    }, 1000);
}

// Start conversation on page load
window.onload = function () {
    setTimeout(() => {
        const chatBox = document.getElementById("chat-box");
        const botMessage = document.createElement("div");
        botMessage.className = "chat-message bot";
        botMessage.innerHTML = `<img src="Images/bot.PNG" class="bot-icon"><span>Hello! Welcome to Fashion Aura. What's your name?</span>`;
        chatBox.appendChild(botMessage);
        step = 1;
    }, 1000);
};
