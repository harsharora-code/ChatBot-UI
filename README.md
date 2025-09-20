🚀 Features

-> Authentication UI (AuthForm.jsx) for login/signup

-> Chat Application Layout (ChatApp.jsx) with sidebar, messages, and input

-> Interactive Chat Interface (ChatInterface.jsx)

-> Reusable Components

-> ChatMessage.jsx → Renders individual chat messages

-> ChatInput.jsx → Input field with placeholder animations

-> ChatSidebar.jsx → Sidebar for navigation/history

-> PlaceholderField.jsx & PlaceholderInput.jsx → UI enhancements

-> Error Handling (NotFound.jsx).

📂 Project Structure

├── backend
    ├── package-lock.json
    
    ├── package.json
    
    ├── server.js
    
    └── server.json
    
├── eslint.config.js

├── index.html

├── package-lock.json

├── package.json

├── src
    ├── App.css
    ├── App.jsx
    ├── components
    │   ├── AuthForm.jsx
    │   ├── ChatApp.jsx
    │   ├── ChatInput.jsx
    │   ├── ChatInterface.jsx
    │   ├── ChatMessage.jsx
    │   ├── ChatSidebar.jsx
    │   ├── NotFound.jsx
    │   ├── PlaceholderField.jsx
    │   ├── PlaceholderInput.jsx
    │   ├── UI
    │   │   ├── Avatar.jsx
    │   │   ├── Button.jsx
    │   │   ├── Card.jsx
    │   │   ├── Input.jsx
    │   │   ├── Label.jsx
    │   │   ├── ScrollArea.jsx
    │   │   ├── Separator.jsx
    │   │   ├── Tabs.jsx
    │   │   └── TextArea.jsx
    │   ├── chat.js
    │   └── lib
    │   │   ├── queryClient.js
    │   │   └── utils.js
    ├── index.css
    ├── main.jsx
    └── tailwind.config.js
└── vite.config.js


🛠️ Tech Stack

Frontend: React + Vite

Styling: Tailwind CSS / Custom CSS

UI Components: Radix UI, ShadCN (optional based on usage)

⚡ Getting Started

Clone the repo

git clone https://github.com/harsharora-code/ChatBot-UI.git

cd ChatBot-UI


1. Install dependencies

npm install


2. Start development server

npm run dev


3. Build for production

npm run build


4. Preview production build

npm run preview

