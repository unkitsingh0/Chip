import React, { useState, useRef, useEffect } from "react";
import "./chip.css";

//Chip component
const Chip = () => {
  //State to store user input
  const [inputValue, setInputValue] = useState("");
  //State to manage to show data when user clicks on input filde
  const [inputClick, setInputClick] = useState(false);

  //State to add chips selected by user
  const [chips, setChips] = useState([]);

  //Static user data
  const [items, setItems] = useState([
    { name: "Ankit Singh", email: "ankitsing@gmail.com" },
    { name: "Amit Singh", email: "amitsingh@gmail.com" },
    { name: "Piyush C", email: "piyushchau@gmail.com" },
    { name: "Shubham Aaguane", email: "shubhamaaguane@gmail.com" },
  ]);

  const inputRef = useRef(null);

  //Counting user backspace
  const [backspaceCount, setBackspaceCount] = useState(0);

  // Adding input value in inputValue state
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  // Handle adding a chip when an item is clicked
  const handleItemClick = (item) => {
    setChips([...chips, { name: item.name, email: item.email }]);
    setItems(items.filter((i) => i !== item));
    setInputValue("");
  };

  // Handle removing a chip when the 'X' is clicked
  const handleChipRemove = (chip) => {
    setChips(chips.filter((c) => c !== chip));
    setItems([...items, { name: chip.name, email: chip.email }]);
  };

  // Handle key down event for the input
  const handleInputKeyDown = (e) => {
    if (e.key === "Backspace" && inputValue === "") {
      // Increase the Backspace count on Backspace press when input is empty
      setBackspaceCount((prevCount) => prevCount + 1);

      if (chips.length === 0) {
        // If there are no chips, reset the Backspace count
        setBackspaceCount(0);
        return;
      }

      if (backspaceCount === 1) {
        // On the second Backspace press, remove the last chip
        const lastChip = chips[chips.length - 1];
        handleChipRemove(lastChip);

        // Reset the Backspace count
        setBackspaceCount(0);
      }
    } else {
      // Reset the Backspace count on any other key press
      setBackspaceCount(0);
    }
  };

  useEffect(() => {
    // Focus the input field when the component mounts
    inputRef.current?.focus();
  }, []);

  return (
    //Main container
    <div className="box-container">
      <div className="box">
        {/* Displaying chips */}
        <div className="chips">
          {chips.map((chip, index) => (
            <div
              key={index}
              className={`chip ${
                backspaceCount === 1 && chips.length - 1 === index
                  ? "chipHighlights" // Highlight the chip when backspace is pressed
                  : ""
              }`}
            >
              <span id="nameIcon0">{chip.name[0]}</span>{" "}
              <span>{chip.name}</span>
              <span
                className="chip-remove"
                onClick={() => handleChipRemove(chip)} // Deleting chip
              >
                X
              </span>
            </div>
          ))}

          {/* Taking input from user */}
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onClick={() => {
              setInputClick(true);
            }}
            onKeyDown={handleInputKeyDown}
            placeholder="Type to search"
            className="input"
            ref={inputRef}
          />
        </div>
      </div>
      {(inputValue || inputClick) && (
        // Render item-list only if inputValue is truthy
        <div className="item-list">
          {items
            .filter((item) =>
              item.name.toLowerCase().includes(inputValue.toLowerCase())
            )
            .map((item, index) => (
              // Displaying result as per user input
              <div
                key={index}
                className="item"
                onClick={() => {
                  handleItemClick(item);
                  setInputClick(false);
                  setBackspaceCount(0);
                }}
              >
                <p>
                  <span id="nameIcon">{item.name[0]}</span>{" "}
                  <span id="listName">{item.name}</span>
                  <span id="listEmail">{item.email}</span>
                </p>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Chip;
