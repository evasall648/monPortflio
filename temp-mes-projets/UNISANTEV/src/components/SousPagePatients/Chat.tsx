"use client";

import React, { useState, useEffect, useRef } from "react";
import { Send, Paperclip } from "lucide-react";

// Importation des images
import defaultImage from "../../assets/Image_Patient/moi.png";
import hawaImage from "../../assets/Image_Patient/hawa.jpg";
import evaImage from "../../assets/Image_Patient/eva.jpg";
import ndeyeImage from "../../assets/Image_Patient/ndeye.jpg";
import krisImage from "../../assets/Image_Patient/kris.jpg";
import joImage from "../../assets/Image_Patient/jo.jpg";
import docImage from "../../assets/Image_Patient/doc.jpg";
import modyImage from "../../assets/Image_Patient/mody.jpg";

interface Contact {
  id: string;
  name: string;
  status: string;
  avatar: string;
  email: string;
}

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
}

// Définir une interface pour le mapping des avatars avec signature d'index
interface AvatarImages {
  [key: string]: string;
  "Hawa Demba Keita": string;
  "Awa Sall": string;
  "Ndeye Awa Dieng": string;
  "Kris Memiague": string;
  "Danicha Bakana": string;
  "Nafi Badji": string;
  "Mody Yero Ndiaye": string;
  "Babacar Thiam": string; // Ajouté pour l'exemple, ajustez selon vos besoins
}

const avatarImages: AvatarImages = {
  "Hawa Demba Keita": hawaImage,
  "Awa Sall": evaImage,
  "Ndeye Awa Dieng": ndeyeImage,
  "Kris Memiague": krisImage,
  "Danicha Bakana": joImage,
  "Nafi Badji": docImage,
  "Mody Yero Ndiaye": modyImage,
  "Babacar Thiam": defaultImage, // Utilisation de l'image par défaut pour cet exemple
};

const getAvatarImage = (doctorName: string): string => {
  return avatarImages[doctorName] || defaultImage;
};

const Chat: React.FC = () => {
  const [selectedContact, setSelectedContact] = useState<string | null>("1");
  const [newMessage, setNewMessage] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);

  const contacts: Contact[] = [
    { id: "1", name: "Hawa Demba Keita", status: Math.random() > 0.5 ? "En ligne" : "Déconnecté", avatar: getAvatarImage("Hawa Demba Keita"), email: "hawak9969@gmail.com" },
    { id: "15", name: "Awa Sall", status: Math.random() > 0.5 ? "En ligne" : "Déconnecté", avatar: getAvatarImage("Awa Sall"), email: "evasall@gmail.com" },
    { id: "2", name: "Ndeye Awa Dieng", status: Math.random() > 0.5 ? "En ligne" : "Déconnecté", avatar: getAvatarImage("Ndeye Awa Dieng"), email: "ndeyeawa@gmail.com" },
    { id: "3", name: "Kris Memiague", status: Math.random() > 0.5 ? "En ligne" : "Déconnecté", avatar: getAvatarImage("Kris Memiague"), email: "krismemiague@gmail.com" },
    { id: "4", name: "Danicha Bakana", status: Math.random() > 0.5 ? "En ligne" : "Déconnecté", avatar: getAvatarImage("Danicha Bakana"), email: "danichabakana@gmail.com" },
    { id: "5", name: "Nafi Badji", status: Math.random() > 0.5 ? "En ligne" : "Déconnecté", avatar: getAvatarImage("Nafi Badji"), email: "nafibadji@gmail.com" },
    { id: "6", name: "Mody Yero Ndiaye", status: Math.random() > 0.5 ? "En ligne" : "Déconnecté", avatar: getAvatarImage("Mody Yero Ndiaye"), email: "modyyero@gmail.com" },
    { id: "59", name: "Babacar Thiam", status: Math.random() > 0.5 ? "En ligne" : "Déconnecté", avatar: getAvatarImage("Babacar Thiam"), email: "babacarthiam@gmail.com" },
  ];

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const newMsg: Message = {
        id: Date.now().toString(),
        sender: "Moi",
        content: newMessage,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }) + ", aujourd'hui",
      };
      setMessages([...messages, newMsg]);
      setNewMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && newMessage.trim()) {
      handleSendMessage();
    }
  };

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const selectedContactData = contacts.find(
    (contact) => contact.id === selectedContact
  );

  return (
    <div className="flex h-[calc(100vh-4rem)] bg-gray-200 dark:bg-gray-800">
      <div className="w-1/4 bg-white dark:bg-gray-700 border-r border-gray-200 dark:border-gray-600 flex flex-col">
        <div className="p-4 border-b border-gray-200 dark:border-gray-600">
          <input
            type="text"
            placeholder="Rechercher un médecin..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border bg-white dark:bg-gray-600 text-gray-800 dark:text-white border-gray-300 dark:border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div className="flex-1 overflow-y-auto">
          {filteredContacts.length > 0 ? (
            filteredContacts.map((contact) => (
              <div
                key={contact.id}
                className={`flex items-center p-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 ${
                  selectedContact === contact.id ? "bg-gray-100 dark:bg-gray-600" : ""
                }`}
                onClick={() => setSelectedContact(contact.id)}
              >
                <div className="relative">
                  <img
                    src={contact.avatar}
                    alt={contact.name}
                    className="h-10 w-10 rounded-full mr-3"
                    onError={(e) => (e.currentTarget.src = defaultImage)}
                  />
                  <span
                    className={`absolute bottom-0 right-3 h-3 w-3 rounded-full ${
                      contact.status === "En ligne" ? "bg-green-500" : "bg-gray-400"
                    }`}
                  ></span>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-800 dark:text-gray-200">{contact.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{contact.status}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="p-4 text-gray-500 dark:text-gray-400">Aucun médecin trouvé</p>
          )}
        </div>
      </div>

      <div className="flex-1 flex flex-col bg-white dark:bg-gray-900">
        {selectedContactData ? (
          <>
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <div className="flex items-center">
                <div className="relative">
                  <img
                    src={selectedContactData.avatar}
                    alt={selectedContactData.name}
                    className="h-10 w-10 rounded-full mr-3"
                    onError={(e) => (e.currentTarget.src = defaultImage)}
                  />
                  <span
                    className={`absolute bottom-0 right-0 h-3 w-3 rounded-full ${
                      selectedContactData.status === "En ligne" ? "bg-green-500" : "bg-gray-400"
                    }`}
                  ></span>
                </div>
                <div>
                  <p className="font-medium text-gray-800 dark:text-gray-200">{selectedContactData.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {selectedContactData.status} - {selectedContactData.email}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex-1 p-4 overflow-y-auto">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === "Moi" ? "justify-end" : "justify-start"} mb-4`}
                >
                  <div
                    className={`max-w-xs p-3 rounded-lg ${
                      message.sender === "Moi"
                        ? "bg-green-100 dark:bg-green-600 text-gray-800 dark:text-white"
                        : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white"
                    }`}
                  >
                    <p>{message.content}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-300 mt-1">{message.timestamp}</p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex items-center">
              <input
                type="text"
                placeholder="Tapez votre message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 p-2 border bg-white dark:bg-gray-600 text-gray-800 dark:text-white border-gray-300 dark:border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button
                className="ml-2 p-2 text-green-500 dark:text-green-400 hover:text-green-600 dark:hover:text-green-300"
                title="Joindre un fichier"
              >
                <Paperclip className="h-5 w-5" />
              </button>
              <button
                className="ml-2 p-2 text-green-500 dark:text-green-400 hover:text-green-600 dark:hover:text-green-300"
                onClick={handleSendMessage}
                title="Envoyer"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500 dark:text-gray-400">
            Sélectionnez un médecin pour commencer une conversation
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;