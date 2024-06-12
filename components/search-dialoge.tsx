// import React, { useRef, useState, useEffect } from "react";
// import { invoke } from "@tauri-apps/api";
// // import { appWindow } from "@tauri-apps/api/window";
// import { DragHandleDots2Icon } from "@radix-ui/react-icons";

// import { Command, CommandInput, CommandList, CommandEmpty } from "@/components/ui/command";

// const handleCommand = async (text: string) => {
//   const response = await invoke("write_text_and_get_response", { text });
//   return response;
// };

// export function SearchDialoge() {
//   const [text, setText] = useState("");
//   const inputRef = useRef<HTMLInputElement>(null);
//   const [response, setResponse] = useState("");
//   const [commandTheme, setCommandTheme] = useState("command-light"); // Default to light theme

//   useEffect(() => {
//     const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
//     const handleChange = (e: MediaQueryList | MediaQueryListEvent) => {
//       // Reverse the logic: dark system theme sets command to light theme, and vice versa
//       setCommandTheme(e.matches ? "command-light" : "command-dark");
//     };

//     // Initial check
//     handleChange(mediaQuery);
//     // Listen for changes
//     mediaQuery.addEventListener('change', handleChange);

//     return () => mediaQuery.removeEventListener('change', handleChange);
//   }, []);

//   const handleSubmit = async (e?: React.MouseEvent | React.KeyboardEvent) => {
//     e?.preventDefault();
//     e?.stopPropagation();

//     const responseText = await handleCommand(text);
//     setText("");
//     setResponse(responseText as string);
//   };

//   const handleDrag = async (e: React.MouseEvent) => {
//     e.preventDefault();
//     const { appWindow } = await import('@tauri-apps/api/window');
//     await appWindow.startDragging();
//   };

//   return (
//     <div className="relative">
//       <div
//         className="absolute top-2 right-2 z-30 cursor-move"
//         onMouseDown={handleDrag}
//       >
//         <DragHandleDots2Icon className="w-6 h-6 text-gray-500" />
//       </div>
//       <Command className={`rounded-lg border shadow-md relative z-20 ${commandTheme}`}>
//         <CommandInput
//           ref={inputRef}
//           placeholder="Type a command or search..."
//           value={text}
//           onValueChange={setText}
//           onKeyDown={(e) => {
//             if (e.key === "Enter") {
//               handleSubmit(e);
//               if (inputRef.current) inputRef.current.blur();
//             }
//           }}
//           className="cursor-text"
//         />
//         <CommandList>
//           <CommandEmpty>{response}</CommandEmpty>
//         </CommandList>
//       </Command>
//       <div className="relative z-30 mt-2">
//         <button
//           onClick={handleSubmit}
//           className="px-3 z-30 py-2 bg-blue-500 text-white rounded text-sm"
//         >
//           Submit
//         </button>
//       </div>
//     </div>
//   );
// }






// // import React, { useRef, useState, useEffect } from "react";
// // // import { appWindow } from "@tauri-apps/api/window";
// // import { DragHandleDots2Icon } from "@radix-ui/react-icons";

// // import { Command, CommandInput, CommandList, CommandEmpty } from "@/components/ui/command";

// // const handleCommand = async (text: string) => {
// //   const { invoke } = await import("@tauri-apps/api");
// //   const response = await invoke("write_text_and_get_response", { text });
// //   return response;
// // };

// // export function SearchDialoge() {
// //   const [text, setText] = useState("");
// //   const inputRef = useRef<HTMLInputElement>(null);
// //   const [response, setResponse] = useState("");
// //   const [commandTheme, setCommandTheme] = useState("command-light"); // Default to light theme

// //   useEffect(() => {
// //     if (typeof window !== 'undefined') {
// //       const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
// //       const handleChange = (e: MediaQueryList | MediaQueryListEvent) => {
// //         // Reverse the logic: dark system theme sets command to light theme, and vice versa
// //         setCommandTheme(e.matches ? "command-light" : "command-dark");
// //       };

// //       // Initial check
// //       handleChange(mediaQuery);
// //       // Listen for changes
// //       mediaQuery.addEventListener('change', handleChange);

// //       return () => mediaQuery.removeEventListener('change', handleChange);
// //     }
// //   }, []);

// //   const handleSubmit = async (e?: React.MouseEvent | React.KeyboardEvent) => {
// //     e?.preventDefault();
// //     e?.stopPropagation();

// //     const responseText = await handleCommand(text);
// //     setText("");
// //     setResponse(responseText as string);
// //   };

// //   const handleDrag = async (e: React.MouseEvent) => {
// //     e.preventDefault();
// //     const { appWindow } = await import('@tauri-apps/api/window');
// //     await appWindow.startDragging();
// //   };

// //   return (
// //     <div className="relative">
// //       <div
// //         className="absolute top-2 right-2 z-30 cursor-move"
// //         onMouseDown={handleDrag}
// //       >
// //         <DragHandleDots2Icon className="w-6 h-6 text-gray-500" />
// //       </div>
// //       <Command className={`rounded-lg border shadow-md relative z-20 ${commandTheme}`}>
// //         <CommandInput
// //           ref={inputRef}
// //           placeholder="Type a command or search..."
// //           value={text}
// //           onValueChange={setText}
// //           onKeyDown={(e) => {
// //             if (e.key === "Enter") {
// //               handleSubmit(e);
// //               if (inputRef.current) inputRef.current.blur();
// //             }
// //           }}
// //           className="cursor-text"
// //         />
// //         <CommandList>
// //           <CommandEmpty>{response}</CommandEmpty>
// //         </CommandList>
// //       </Command>
// //       <div className="relative z-30 mt-2">
// //         <button
// //           onClick={handleSubmit}
// //           className="px-3 z-30 py-2 bg-blue-500 text-white rounded text-sm"
// //         >
// //           Submit
// //         </button>
// //       </div>
// //     </div>
// //   );
// // }



// import React, { useRef, useState, useEffect } from "react";
// import { DragHandleDots2Icon } from "@radix-ui/react-icons";
// import { Command, CommandInput, CommandList, CommandEmpty } from "@/components/ui/command";

// export function SearchDialoge() {
//   const [text, setText] = useState("");
//   const inputRef = useRef<HTMLInputElement>(null);
//   const [response, setResponse] = useState("");
//   const [commandTheme, setCommandTheme] = useState("command-light"); // Default to light theme
//   const [handleCommand, setHandleCommand] = useState<((text: string) => Promise<string>) | null>(null);

//   useEffect(() => {
//     if (typeof window !== 'undefined') {
//       const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
//       const handleChange = (e: MediaQueryList | MediaQueryListEvent) => {
//         // Reverse the logic: dark system theme sets command to light theme, and vice versa
//         setCommandTheme(e.matches ? "command-light" : "command-dark");
//       };

//       // Initial check
//       handleChange(mediaQuery);
//       // Listen for changes
//       mediaQuery.addEventListener('change', handleChange);

//       return () => mediaQuery.removeEventListener('change', handleChange);
//     }
//   }, []);

//   useEffect(() => {
//     if (typeof window !== 'undefined') {
//       const loadHandleCommand = async () => {
//         const { invoke } = await import("@tauri-apps/api");
//         const commandFunction = async (text: string) => {
//           const response = await invoke("write_text_and_get_response", { text });
//           return response as string;
//         };
//         setHandleCommand(() => commandFunction);
//       };

//       loadHandleCommand();
//     }
//   }, []);

//   // Autofocus effect
//   useEffect(() => {
//     if (inputRef.current) {
//       inputRef.current.focus();
//     }
//   }, []);

//   const handleSubmit = async (e?: React.MouseEvent | React.KeyboardEvent) => {
//     e?.preventDefault();
//     e?.stopPropagation();

//     if (handleCommand) {
//       const responseText = await handleCommand(text);
//       setText("");
//       setResponse(responseText);
//     }
//   };

//   const handleDrag = async (e: React.MouseEvent) => {
//     e.preventDefault();
//     const { appWindow } = await import('@tauri-apps/api/window');
//     await appWindow.startDragging();
//   };

//   return (
//     <div className="relative">
//       <div
//         className="absolute top-2 right-2 z-30 cursor-move"
//         onMouseDown={handleDrag}
//       >
//         <DragHandleDots2Icon className="w-6 h-6 text-gray-500" />
//       </div>
//       <Command className={`rounded-lg border shadow-md relative z-20 ${commandTheme}`}>
//         <CommandInput
//           ref={inputRef}
//           placeholder="Type a command or search..."
//           value={text}
//           onValueChange={setText}
//           onKeyDown={(e) => {
//             if (e.key === "Enter") {
//               handleSubmit(e);
//               if (inputRef.current) inputRef.current.blur();
//             }
//           }}
//           className="cursor-text"
//         />
//         <CommandList>
//           <CommandEmpty>{response}</CommandEmpty>
//         </CommandList>
//       </Command>
//       <div className="relative z-30 mt-2">
//         <button
//           onClick={handleSubmit}
//           className="px-3 z-30 py-2 bg-blue-500 text-white rounded text-sm"
//         >
//           Submit
//         </button>
//       </div>
//     </div>
//   );
// }


import React, { useRef, useState, useEffect } from "react";
import { DragHandleDots2Icon } from "@radix-ui/react-icons";
import { Command, CommandInput, CommandList, CommandEmpty } from "@/components/ui/command";

interface SearchDialogProps {
  inputRef: React.MutableRefObject<HTMLInputElement | null>;
}

export function SearchDialoge({ inputRef }: SearchDialogProps) {
  const [text, setText] = useState("");
  const [response, setResponse] = useState("");
  const [commandTheme, setCommandTheme] = useState("command-light"); // Default to light theme
  const [handleCommand, setHandleCommand] = useState<((text: string) => Promise<string>) | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = (e: MediaQueryList | MediaQueryListEvent) => {
        // Reverse the logic: dark system theme sets command to light theme, and vice versa
        setCommandTheme(e.matches ? "command-light" : "command-dark");
      };

      // Initial check
      handleChange(mediaQuery);
      // Listen for changes
      mediaQuery.addEventListener('change', handleChange);

      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const loadHandleCommand = async () => {
        const { invoke } = await import("@tauri-apps/api");
        const commandFunction = async (text: string) => {
          const response = await invoke("write_text_and_get_response", { text });
          return response as string;
        };
        setHandleCommand(() => commandFunction);
      };

      loadHandleCommand();
    }
  }, []);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef]);

  const handleSubmit = async (e?: React.MouseEvent | React.KeyboardEvent) => {
    e?.preventDefault();
    e?.stopPropagation();

    if (handleCommand) {
      const responseText = await handleCommand(text);
      setText("");
      setResponse(responseText);

      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  };

  const handleDrag = async (e: React.MouseEvent) => {
    e.preventDefault();
    const { appWindow } = await import('@tauri-apps/api/window');
    await appWindow.startDragging();
  };

  return (
    <div className="relative">
      <div
        className="absolute top-2 right-2 z-30 cursor-move"
        onMouseDown={handleDrag}
      >
        <DragHandleDots2Icon className="w-6 h-6 text-gray-500" />
      </div>
      <Command className={`rounded-lg border shadow-md relative z-20 ${commandTheme}`}>
        <CommandInput
          ref={inputRef}
          placeholder="Type a command or search..."
          value={text}
          onValueChange={setText}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSubmit(e);
              if (inputRef.current) inputRef.current.blur();
            }
          }}
          className="cursor-text"
        />
        <CommandList>
          <CommandEmpty>{response}</CommandEmpty>
        </CommandList>
      </Command>
      <div className="relative z-30 mt-2">
        <button
          onClick={handleSubmit}
          className="px-3 z-30 py-2 bg-blue-500 text-white rounded text-sm"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
