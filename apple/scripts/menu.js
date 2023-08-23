const menuItems = [
  {
    type: "img",
    src: "/apple/img/a.png",
    submenu: [
      { type: "midi", href: "#", content: "About the Finder",  onClick: playMidi },
      { type: "divider"},
      { type: "hyperlink", href: "https://www.youtube.com/watch?v=iNpXCzaWW1s", content: "Alarm Clock" },
      { type: "hyperlink", href: "https://www.wolframalpha.com", content: "Calculator" },
      { type: "hyperlink", href: "https://www.hp.com/us-en/shop/cat/printers", content: "Chooser" },
      { type: "hyperlink", href: "https://www.cloudflare.com", content: "Control Panel" },
      { type: "hyperlink", href: "https://www.archive.org", content: "Find File" },
      { type: "hyperlink", href: "https://www.amazon.com/keycaps/s?k=keycaps", content: "Key Caps" },
      { type: "hyperlink", href: "https://www.pinterest.com", content: "Scrapbook" },
    ]
  },
  {
    type: "text",
    content: "File",
    submenu: [
      { type: "text", content: "New Folder", textColor: "gray" },
      { type: "text", content: "Open", textColor: "gray" },
      { type: "print", content: "Print" },
      { type: "hyperlink", href: "javascript:closeTab();", content: "Close" },
      { type: "divider"},
      { type: "text", content: "Get Info", textColor: "gray" },
      { type: "text", content: "Duplicate", textColor: "gray" },
      { type: "text", content: "Put Away", textColor: "gray" },
      { type: "divider"},
      { type: "print", content: "Page Setup" },
      { type: "text", content: "Page Directory", textColor: "gray" },
      { type: "divider"},
      { type: "text", content: "Eject", textColor: "gray" }
    ]
  },
  {
    type: "text",
    content: "Edit",
    submenu: [
      { type: "text", content: "Undo", textColor: "gray" },
      { type: "divider"},
      { type: "text", content: "Cut", textColor: "gray" },
      { type: "text", content: "Copy", textColor: "gray" },
      { type: "text", content: "Paste", textColor: "gray" },
      { type: "text", content: "Clear", textColor: "gray" },
      { type: "text", content: "Select All", textColor: "gray" },
      { type: "divider"},
      { type: "gif", src: "img/clippy.gif", content: "View Clippy" },
    ]
  },
  {
    type: "text",
    content: "View",
    submenu: [
      { type: "text", content: "by Land", textColor: "gray" },
      { type: "text", content: "by Sea", textColor: "gray" },
      { type: "text", content: "by Air", textColor: "gray" },
    ]
  },
  {
    type: "text",
    content: "Special",
    submenu: [
      { type: "text", content: "Clean Up Window", textColor: "gray" },
      { type: "text", content: "Empty Trash", textColor: "gray" },
      { type: "text", content: "Erase Disk", textColor: "gray" },
      { type: "text", content: "Set Startup..." },
      { type: "divider"},
      { type: "hyperlink", href: "", content: "Restart" },
      { type: "hyperlink", href: "javascript:shutdown()", content: "Shutdown" }
    ]
  },
  {
    type: "hyperlink",
    href: "https://www.google.com",
    content: "Help"
  }
];

const appleMenu = document.getElementById("appleMenu");

menuItems.forEach(item => {
  const menuItem = document.createElement("span");

  if (item.type === "text") {
    menuItem.textContent = item.content;
  } else if (item.type === "img") {
    const imgElem = document.createElement("img");
    imgElem.src = item.src;
    imgElem.alt = item.alt;
    imgElem.style.height = "20px"; // Let the height adjust automatically
    menuItem.appendChild(imgElem);
  } else if (item.type === "hyperlink") {
    const linkElem = document.createElement("a");
    linkElem.href = item.href;
    linkElem.textContent = item.content;
    linkElem.style.color = "black"; // Set the desired color for the hyperlink
    linkElem.style.textDecoration = "none"; // Remove underline
    menuItem.appendChild(linkElem); 
  } 
  if (item.submenu) {
    const submenu = document.createElement("div");
    submenu.className = "submenu";
  
    let dividerCount = 0;
  
    item.submenu.forEach(submenuItem => {
      const submenuItemElem = document.createElement("div");
      submenuItemElem.className = "submenu-item";
  
      if (submenuItem.type === "text") {
        const submenuTextElem = document.createElement("div");
        submenuTextElem.className = "submenu-text";
        submenuTextElem.textContent = submenuItem.content;
        submenuTextElem.style.color = submenuItem.textColor || "black";
        submenuItemElem.appendChild(submenuTextElem);
      } else if (submenuItem.type === "img") {
        const submenuImgElem = document.createElement("img");
        submenuImgElem.src = submenuItem.src;
        submenuImgElem.alt = submenuItem.alt;
        submenuItemElem.appendChild(submenuImgElem);
      } else if (submenuItem.type === "midi") {
        const submenuLinkElem = document.createElement("a");
        submenuLinkElem.href = submenuItem.href;
        submenuLinkElem.textContent = submenuItem.content;
        submenuLinkElem.style.color = "black"; // Set the desired color for the hyperlink
        submenuLinkElem.style.textDecoration = "none"; // Remove underline
        submenuLinkElem.addEventListener("click", event => {
          event.preventDefault(); // Prevent the default hyperlink behavior
          if (submenuItem.onClick) {
            submenuItem.onClick(); // Call the provided onClick function
          }
        });
        submenuItemElem.appendChild(submenuLinkElem);
      } else if (submenuItem.type === "hyperlink") {
        const submenuLinkElem = document.createElement("a");
        submenuLinkElem.href = submenuItem.href;
        submenuLinkElem.textContent = submenuItem.content;
        submenuLinkElem.style.color = "black"; // Set the desired color for the hyperlink
        submenuLinkElem.style.textDecoration = "none"; // Remove underline
        submenuItemElem.appendChild(submenuLinkElem);
      } else if (submenuItem.type === "divider") {
        // Only add a divider if there's more than one divider or if it's the first one
        if (dividerCount > 0 || dividerCount === 0) {
          const dividerElem = document.createElement("hr");
          dividerElem.className = "submenu-divider";
          submenu.appendChild(dividerElem);
        }
        dividerCount++;
      } else if (submenuItem.type === "print") {
        const submenuLinkElem = document.createElement("a");
        submenuLinkElem.href = "#";
        submenuLinkElem.onclick = function () {
          window.print();
          return false;
        };
        submenuLinkElem.textContent = submenuItem.content;
        submenuLinkElem.style.color = submenuItem.textColor || "black";
        submenuLinkElem.style.textDecoration = "none";
        submenuItemElem.appendChild(submenuLinkElem);
      } else if (submenuItem.type === "gif") {
        submenuItemElem.textContent = submenuItem.content;

        submenuItemElem.addEventListener("click", () => {
          const gifContainer = document.createElement("div");
          gifContainer.className = "submenu-gif-container";

          const gifImage = document.createElement("img");
          gifImage.src = submenuItem.src; // Use the defined src property
          gifImage.alt = "GIF";
          gifImage.className = "submenu-gif-image";

          gifContainer.appendChild(gifImage);
          document.body.appendChild(gifContainer);

          setTimeout(() => {
            gifContainer.style.display = "block";
          }, 0);

          gifContainer.addEventListener("click", () => {
            gifContainer.style.opacity = "0";
            gifContainer.style.transform = "scale(0.1)";
            setTimeout(() => {
              gifContainer.remove();
            }, 300);
          });
        });
      }
      submenu.appendChild(submenuItemElem);
    });
    menuItem.appendChild(submenu);
  }

  appleMenu.appendChild(menuItem);
});

function closeTab() {
  if (confirm("Close Window?")) {
    // Simulate the key combination for closing a tab
    const event = new KeyboardEvent("keydown", {
      key: "w",
      ctrlKey: true,  // Set this to true for Windows/Linux, false for macOS
      metaKey: true,  // Set this to true for macOS, false for Windows/Linux
    });

    window.dispatchEvent(event);
  }
}

function restart() {
  if (confirm("Restart the system?")) {
    location.reload();
  }
}

function shutdown() {
  if (confirm("Shutdown the system?")) {
    const overlay = document.createElement("div");
    overlay.className = "shutdown-overlay";

    const audioShutdown = document.createElement("audio");
    audioShutdown.src = "/apple/audio/shutdown.mp3"; // Replace with the path to your shutdown sound
    audioShutdown.autoplay = true;

    overlay.appendChild(audioShutdown);
    document.body.appendChild(overlay);

    setTimeout(() => {
      overlay.style.opacity = "1";
    }, 0);

    setTimeout(() => {
      document.body.style.transition = "background-color 2s";
      document.body.style.backgroundColor = "black";
      overlay.style.opacity = "0";
      overlay.style.pointerEvents = "none"; // Disable interaction with overlay
    }, 7000);

    setTimeout(() => {
      // Perform the actual shutdown action here
      // This could involve navigating to a different page or executing other actions
      document.body.removeChild(overlay);
      
      // Play startup sound after shutdown overlay's timeout
      const audioStartup = document.createElement("audio");
      audioStartup.src = "/apple/audio/startup.mp3"; // Replace with the path to your startup sound
      audioStartup.autoplay = true;
      document.body.appendChild(audioStartup);

      setTimeout(() => {
        document.body.style.transition = "background-color 2s";
        document.body.style.backgroundColor = "white";
        document.body.removeChild(audioStartup);
      }, 2000);
    }, 7000);
  }
}
function playMidi() {
  console.log("playMidi() function is called");
  const audioMidi = document.createElement("audio");
  audioMidi.src = "/apple/audio/clone.mp3"; // Replace with the path to your MP3 file
  audioMidi.style.display = "none"; // Hide the audio element
  document.body.appendChild(audioMidi);

  // Play the audio immediately after creating the element
  audioMidi.play();
}
