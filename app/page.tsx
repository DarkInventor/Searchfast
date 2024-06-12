// 'use client'
// import { useEffect } from 'react';
// import { SearchDialoge } from '@/components/search-dialoge';
// import { appWindow } from '@tauri-apps/api/window';
// import { register } from '@tauri-apps/api/globalShortcut'; // Corrected import


// function Home() {
//   useEffect(() => {
//     const registerShortCuts = async () => {
//       await register('Cmd+J', async () => {
//         const isVisible = await appWindow.isVisible();
//         if (isVisible) {
//           await appWindow.hide();
//         } else {
//           await appWindow.show();
//         }
//       });
//     };

//     registerShortCuts();
//   }, []);

//   return (
//     <div className="container">
//       <SearchDialoge />
//     </div>
//   );
// }

// export default Home;

// 'use client'
// import { useEffect } from 'react';
// import { SearchDialoge } from '@/components/search-dialoge';

// // Ensure Tauri APIs are only imported and used client-side
// const isClient = typeof window !== "undefined";

// let appWindow: { isVisible: () => any; hide: () => any; show: () => any; }, register: (arg0: string, arg1: () => Promise<void>) => any;
// if (isClient) {
//   appWindow = require('@tauri-apps/api/window').appWindow;
//   register = require('@tauri-apps/api/globalShortcut').register;
// }

// function Home() {
//   useEffect(() => {
//     if (!isClient) return; // Exit if not client-side

//     const registerShortCuts = async () => {
//       await register('Cmd+J', async () => {
//         const isVisible = await appWindow.isVisible();
//         if (isVisible) {
//           await appWindow.hide();
//         } else {
//           await appWindow.show();
//         }
//       });
//     };

//     registerShortCuts();
//   }, []);

//   return (
//     <div className="container">
//       <SearchDialoge />
//     </div>
//   );
// }

// export default Home;




// 'use client'
// import { useEffect } from 'react';
// import { SearchDialoge } from '@/components/search-dialoge';

// function Home() {
//   useEffect(() => {
//     // Ensure this code runs only on the client side
//     if (typeof window !== "undefined") {
//       const loadTauriModules = async () => {
//         const { appWindow } = await import('@tauri-apps/api/window');
//         const { register } = await import('@tauri-apps/api/globalShortcut');

//         const registerShortCuts = async () => {
//           await register('Cmd+J', async () => {
//             const isVisible = await appWindow.isVisible();
//             if (isVisible) {
//               await appWindow.hide();
//             } else {
//               await appWindow.show();
//             }
//           });
//         };

//         registerShortCuts();
//       };

//       loadTauriModules();
//     }
//   }, []);

//   return (
//     <div className="container">
//       <SearchDialoge />
//     </div>
//   );
// }

// export default Home;

// 'use client'
// import { useEffect } from 'react';
// import { SearchDialoge } from '@/components/search-dialoge';

// function Home() {
//   useEffect(() => {
//     // Ensure this code runs only on the client side
//     if (typeof window !== "undefined") {
//       const loadTauriModules = async () => {
//         const tauriWindow = await import('@tauri-apps/api/window');
//         const appWindow = tauriWindow.appWindow;
//         const register = (await import('@tauri-apps/api/globalShortcut')).register;

//         const registerShortCuts = async () => {
//           await register('Cmd+J', async () => {
//             const isVisible = await appWindow.isVisible();
//             if (isVisible) {
//               await appWindow.hide();
//             } else {
//               await appWindow.show();
//             }
//           });
//         };

//         registerShortCuts();
//       };

//       loadTauriModules();
//     }
//   }, []);

//   return (
//     <div className="container">
//       <SearchDialoge />
//     </div>
//   );
// }

// export default Home;


// Working code

'use client'
import { useEffect, useRef } from 'react';
import { SearchDialoge } from '@/components/search-dialoge';

function Home() {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Ensure this code runs only on the client side
    if (typeof window !== "undefined") {
      const loadTauriModules = async () => {
        const tauriWindow = await import('@tauri-apps/api/window');
        const appWindow = tauriWindow.appWindow;
        const register = (await import('@tauri-apps/api/globalShortcut')).register;

        const registerShortCuts = async () => {
          await register('Cmd+J', async () => {
            const isVisible = await appWindow.isVisible();
            if (isVisible) {
              await appWindow.hide();
            } else {
              await appWindow.show();
              // Focus on the input field when window is shown
              if (inputRef.current) {
                inputRef.current.focus();
              }
            }
          });
        };

        registerShortCuts();
      };

      loadTauriModules();
    }
  }, []);

  return (
    <div className="container">
      <SearchDialoge inputRef={inputRef} />
    </div>
  );
}

export default Home;
