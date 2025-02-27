# Poll System

An interactive poll system built with React that allows users to create, vote on, and view results of custom polls.

## Features

- Create polls with custom questions and multiple options
- Vote on available polls
- View real-time poll results with percentage bars
- Delete polls
- Simple and intuitive interface

## Getting Started

### Prerequisites

- Node.js (v14.0.0 or higher)
- npm (v6.14.0 or higher)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/poll-system.git
   cd poll-system
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

## Project Structure

```
poll-system/
│
├── public/
│   ├── index.html
│   └── favicon.ico
│
├── src/
│   ├── components/
│   │   └── PollSystem.js
│   ├── App.js
│   ├── index.js
│   └── index.css
│
├── package.json
└── README.md
```

## Usage

1. **Creating a Poll**:
   - Click on the "Create Poll" tab
   - Enter a poll question
   - Add at least two options
   - Click "Create Poll"

2. **Voting on a Poll**:
   - Go to the "View Polls" tab
   - Click on an option to cast your vote

3. **Viewing Results**:
   - After voting, you'll be automatically taken to the results page
   - You can also view results by clicking the "Results" button on any poll

4. **Managing Polls**:
   - Delete unwanted polls using the "Delete" button

## Customization

You can customize the appearance by modifying the Tailwind CSS classes in the components or by editing the `index.css` file.

## Future Enhancements

- User authentication
- Poll expiration dates
- Multiple vote types (single choice, multiple choice, etc.)
- Data export functionality
- Mobile app version

## License

This project is licensed under the MIT License - see the LICENSE file for details.