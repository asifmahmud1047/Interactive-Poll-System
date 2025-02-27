import React, { useState } from "react";

const PollSystem = () => {
  const [polls, setPolls] = useState([]);
  const [currentView, setCurrentView] = useState("create"); // 'create', 'list', or 'results'
  const [newPollTitle, setNewPollTitle] = useState("");
  const [newPollOptions, setNewPollOptions] = useState(["", ""]);
  const [selectedPoll, setSelectedPoll] = useState(null);

  // Create a new poll
  const handleCreatePoll = () => {
    if (
      newPollTitle.trim() === "" ||
      newPollOptions.some((option) => option.trim() === "")
    ) {
      alert("Please provide a title and at least two non-empty options");
      return;
    }

    const newPoll = {
      id: Date.now(),
      title: newPollTitle,
      options: newPollOptions.map((option) => ({
        text: option,
        votes: 0,
      })),
      totalVotes: 0,
      created: new Date().toLocaleString(),
    };

    setPolls([...polls, newPoll]);
    setNewPollTitle("");
    setNewPollOptions(["", ""]);
    setCurrentView("list");
  };

  // Add a new option field
  const handleAddOption = () => {
    setNewPollOptions([...newPollOptions, ""]);
  };

  // Update option text
  const handleOptionChange = (index, value) => {
    const updatedOptions = [...newPollOptions];
    updatedOptions[index] = value;
    setNewPollOptions(updatedOptions);
  };

  // Remove an option
  const handleRemoveOption = (index) => {
    if (newPollOptions.length <= 2) {
      alert("A poll must have at least two options");
      return;
    }
    const updatedOptions = newPollOptions.filter((_, i) => i !== index);
    setNewPollOptions(updatedOptions);
  };

  // Vote for an option
  const handleVote = (pollId, optionIndex) => {
    setPolls(
      polls.map((poll) => {
        if (poll.id === pollId) {
          const updatedOptions = [...poll.options];
          updatedOptions[optionIndex] = {
            ...updatedOptions[optionIndex],
            votes: updatedOptions[optionIndex].votes + 1,
          };
          return {
            ...poll,
            options: updatedOptions,
            totalVotes: poll.totalVotes + 1,
          };
        }
        return poll;
      })
    );
    setCurrentView("results");
    setSelectedPoll(pollId);
  };

  // Delete a poll
  const handleDeletePoll = (pollId) => {
    setPolls(polls.filter((poll) => poll.id !== pollId));
    if (selectedPoll === pollId) {
      setSelectedPoll(null);
    }
  };

  // Render create poll form
  const renderCreatePollForm = () => (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Create a New Poll</h2>

      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">
          Poll Question
        </label>
        <input
          type="text"
          value={newPollTitle}
          onChange={(e) => setNewPollTitle(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
          placeholder="Enter your question here"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">
          Options
        </label>
        {newPollOptions.map((option, index) => (
          <div key={index} className="flex mb-2">
            <input
              type="text"
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              className="flex-grow px-3 py-2 border rounded-md mr-2"
              placeholder={`Option ${index + 1}`}
            />
            <button
              onClick={() => handleRemoveOption(index)}
              className="px-3 py-2 bg-red-500 text-white rounded-md"
              title="Remove option"
            >
              ✕
            </button>
          </div>
        ))}
        <button
          onClick={handleAddOption}
          className="px-4 py-2 bg-blue-500 text-white rounded-md mt-2"
        >
          + Add Option
        </button>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleCreatePoll}
          className="px-4 py-2 bg-green-500 text-white rounded-md"
        >
          Create Poll
        </button>
      </div>
    </div>
  );

  // Render poll list
  const renderPollList = () => (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Available Polls</h2>
        <button
          onClick={() => setCurrentView("create")}
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          + New Poll
        </button>
      </div>

      {polls.length === 0 ? (
        <p className="text-gray-500">No polls have been created yet.</p>
      ) : (
        <div className="space-y-4">
          {polls.map((poll) => (
            <div key={poll.id} className="border rounded-md p-4">
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-semibold mb-2">{poll.title}</h3>
                <div className="flex space-x-2">
                  <button
                    onClick={() => {
                      setSelectedPoll(poll.id);
                      setCurrentView("results");
                    }}
                    className="px-3 py-1 bg-blue-500 text-white rounded-md text-sm"
                  >
                    Results
                  </button>
                  <button
                    onClick={() => handleDeletePoll(poll.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded-md text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>

              <p className="text-sm text-gray-500 mb-3">
                Created: {poll.created}
              </p>
              <p className="text-sm text-gray-500 mb-3">
                Total votes: {poll.totalVotes}
              </p>

              <div className="space-y-2">
                {poll.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleVote(poll.id, index)}
                    className="w-full py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-100 text-left"
                  >
                    {option.text}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  // Render poll results
  const renderPollResults = () => {
    const poll = polls.find((p) => p.id === selectedPoll);

    if (!poll) {
      return <div>Poll not found</div>;
    }

    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{poll.title}</h2>
          <button
            onClick={() => setCurrentView("list")}
            className="px-4 py-2 bg-gray-500 text-white rounded-md"
          >
            Back to Polls
          </button>
        </div>

        <p className="text-sm text-gray-500 mb-3">Created: {poll.created}</p>
        <p className="text-sm text-gray-500 mb-4">
          Total votes: {poll.totalVotes}
        </p>

        {poll.totalVotes === 0 ? (
          <p className="text-gray-500">No votes have been cast yet.</p>
        ) : (
          <div className="space-y-4">
            {poll.options.map((option, index) => {
              const percentage =
                poll.totalVotes > 0
                  ? Math.round((option.votes / poll.totalVotes) * 100)
                  : 0;

              return (
                <div key={index} className="mb-2">
                  <div className="flex justify-between mb-1">
                    <span>{option.text}</span>
                    <span>
                      {option.votes} votes ({percentage}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div
                      className="bg-blue-500 h-4 rounded-full"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  // Main render
  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="bg-blue-500 text-white p-4 rounded-t-lg mb-6">
        <h1 className="text-2xl font-bold text-center">
          Interactive Poll System
        </h1>
      </div>

      <div className="mb-6">
        <div className="flex border-b">
          <button
            onClick={() => setCurrentView("create")}
            className={`py-2 px-4 ${
              currentView === "create"
                ? "border-b-2 border-blue-500 font-semibold"
                : ""
            }`}
          >
            Create Poll
          </button>
          <button
            onClick={() => setCurrentView("list")}
            className={`py-2 px-4 ${
              currentView === "list"
                ? "border-b-2 border-blue-500 font-semibold"
                : ""
            }`}
          >
            View Polls
          </button>
          {selectedPoll && (
            <button
              onClick={() => setCurrentView("results")}
              className={`py-2 px-4 ${
                currentView === "results"
                  ? "border-b-2 border-blue-500 font-semibold"
                  : ""
              }`}
            >
              Results
            </button>
          )}
        </div>
      </div>

      {currentView === "create" && renderCreatePollForm()}
      {currentView === "list" && renderPollList()}
      {currentView === "results" && renderPollResults()}
    </div>
  );
};

export default PollSystem;
