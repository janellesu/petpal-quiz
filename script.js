document.addEventListener("DOMContentLoaded", () => {
    const quizForm = document.querySelector("form");
    const quizSection = document.querySelector(".quiz");
    quizForm.addEventListener("submit", (event) => { // listens for submit button
        event.preventDefault();
        const formData = new FormData(quizForm);
        const answers = Object.fromEntries(formData.entries());
        
        // Clear previous result
        let resultContainer = document.querySelector("#results");
        if(!resultContainer) { //checks if null so no previous results
            resultContainer = document.createElement("div"); //creates div element
            resultContainer.id = "results"; //assigns results id to div
            quizSection.insertAdjacentElement("afterend", resultContainer); //appends after quiz section
        }
        resultContainer.innerHTML = "<h2>Your Answer:</h2>";

        //loops through answers and displays
        for (const [question, answer] of Object.entries(answers)) {
            const p = document.createElement("p");
            p.textContent = `${question}: ${answer}`;
            resultContainer.appendChild(p);
        }
        // TODO: make results more user friendly
    })
})

// TODO: Match answers to pet rec and pet care