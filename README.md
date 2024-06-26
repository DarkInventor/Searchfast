# SearchFast

SearchFast is an innovative search tool designed specifically for macOS, compatible with both Intel and M series chips. Built with a combination of Next.js, Tauri, Rust, and leveraging OpenAI's powerful GPT models through async-openai, it offers a seamless and efficient universal search experience. SearchFast integrates deeply with macOS, providing instant access to information without interrupting your workflow.

https://github.com/DarkInventor/Searchfast/assets/67015517/bac8b585-a70f-4981-8d1f-9e41212c0746

## Key Features

- **Universal macOS Compatibility**: Runs smoothly on macOS, whether on Intel or M series chips.
- **Efficient Background Operation**: Designed to operate in the background, ready to be summoned with a simple keyboard shortcut.
- **Instant Access with `Cmd+J`**: Activate SearchFast from anywhere with the `Cmd+J` shortcut, making it a breeze to launch without needing to navigate through applications.
- **Built with Tauri and Rust**: Ensures a lightweight, high-performance application with low resource consumption.
- **Leverages OpenAI**: Utilizes OpenAI's GPT models for intelligent, context-aware searches.
- **Modern Frontend**: A modern, responsive UI built with Next.js, TypeScript, Shadcn UI, and Tailwind CSS for a seamless user experience.

## Getting Started

- Replace NEXT_PUBLIC_OPENAI_API_KEY with your OpenAI Api Key in the env as well as in the main.rs file

### Prerequisites

- Rust
- Tauri prerequisites for macOS
- Next.js

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/searchfast.git
    cd searchfast
    ```

2. Install the dependencies:
    ```bash
    pnpm install
    ```

3. Start the development server:
    ```bash
    pnpm tauri dev
    ```

4. Build the Tauri application:
    ```bash
    cd src-tauri
    pnpm build
    ```

### Usage

With SearchFast running in the background, simply press `Cmd+J` (or your configured shortcut) to bring up the search interface. Type your query, and SearchFast will leverage the power of OpenAI to provide relevant results instantly.

## Contributing

Contributions to SearchFast are welcome! Whether it's feature requests, bug reports, or code contributions, please feel free to make a pull request or open an issue.

## License

SearchFast is open-source software licensed under the MIT license.
