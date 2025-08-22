document.addEventListener("DOMContentLoaded", () => {
    const quizForm = document.querySelector("form");
    const quizSection = document.querySelector(".quiz");
    quizForm.addEventListener("submit", (event) => { // listens for submit button
        event.preventDefault();
        const formData = new FormData(quizForm);
        const answers = Object.fromEntries(formData.entries());

        for(let pet in scores) {
            scores[pet] = 0;
        }

        for(const [question, answer] of Object.entries(answers)) {
            if(scoring[question] && scoring[question][answer]) {
                const catObj = scoring[question][answer];
                for(const [category, points] of Object.entries(catObj)) {
                    if (categories[category]) {
                        categories[category].forEach(pet => {
                            scores[pet] += points;
                        });
                    }
                }
            }
        }
        
        const topPets = bestPet(scores);
        // Clear previous result
        let resultContainer = document.querySelector("#results");
        if(!resultContainer) { //checks if null so no previous results
            resultContainer = document.createElement("div"); //creates div element
            resultContainer.id = "results"; //assigns results id to div
            quizSection.insertAdjacentElement("afterend", resultContainer); //appends after quiz section
        }
        resultContainer.innerHTML = `
        <h2>Your petPal match:</h2>
        <p>We recommend: ${topPets.join(", ")}</p>`;
    })
})

// TODO: Match answers to pet rec and pet care

let scores = {
    //dogs
    labrador: 0,
    golden: 0,
    frenchBulldog: 0,
    german: 0,
    poodle: 0,
    pom: 0,


    //cats
    persian: 0, //not active
    siamese: 0, //active
    maineCoon: 0, //active
    exotic: 0, //active
    american: 0, //not active


    //other
    rabbit: 0,
    hamster: 0,
    parrot: 0,
    gecko: 0
};
const categories = {
    //Dogs 
    largeDogs: ["labrador", "golden", "german", "poodle"],
    smallDogs: ["frenchBulldog", "pom"],

    //Cats
    activeCats: ["siamese", "maineCoon", "exotic"],
    notActiveCats: ["persian", "american"],

    //other pets
    otherPets: ["rabbit", "hamster", "parrot", "gecko"],

    //maintenance
    lowMaintenance: ["american", "hamster", "gecko"],
    modMaintenance: ["labrador", "golden", "frenchBulldog", "siamese", "exotic", "rabbit"],
    highMaintenance: ["german", "pom", "poodle", "persian", "maineCoon", "parrot"],

    //pet categories
    dogs: ["labrador", "golden", "frenchBulldog", "german", "poodle", "pom"],
    cats: ["persian", "siamese", "maineCoon", "exotic", "american"],
    otherPets: ["rabbit", "hamster", "gecko", "parrot"],

    //friendliness
    friendly: ["labrador", "golden", "frenchBulldog", "german", "poodle", "siamese", "maineCoon", "parrot"],
    independent: ["pom", "persian", "exotic", "american", "rabbit", "hamster", "gecko"],

    //allergies
    hypoallergenic: ["poodle", "siamese", "gecko"],

    //temper 
    calm: ["golden", "frenchBulldog", "poodle", "persian", "maineCoon", "exotic", "american", "rabbit", "gecko"],
    playful: ["labrador", "golden", "pom", "siamese", "maineCoon", "hamster", "parrot"],
    protective: ["labrador", "german"],

    //noise
    lowNoise: ["frenchBulldog", "persian", "exotic", "american", "rabbit", "hamster"],
    mediumNoise: ["labrador", "golden", "poodle", "maineCoon"],
    noisy: ["german", "pom", "siamese", "parrot"]
};

const scoring = {
    activity: {
        "very-active": { largeDogs: 3, activeCats: 2},
        "somewhat-active": { smallDogs: 3, otherPets: 1},
        "not-active": { notActiveCats: 3, otherPets: 3}
    },
    home: {
        "small-home": {smallDogs: 3, otherPets:3, notActiveCats: 3 },
        "medium-home": { activeCats: 3, parrot: 3, otherPets: 2},
        "big-home": { largeDogs: 3}
    },
    time: {
        "very-little-time": {lowMaintenance: 3, modMaintenance: 1},
        "enough-time": {highMaintenance: 1, modMaintenance: 3, lowMaintenance: 2},
        "lots-of-time": {highMaintenance: 3, modMaintenance: 3, lowMaintenance: 3}
    },
    experience: {
        "no-experience": {smallDogs: 3, otherPets: 3, notActiveCats: 3},
        "some-experience": {smallDogs: 3, activeCats: 3, otherPets: 3, largeDogs: 2},
        "experienced": {dogs: 3, cats: 3, otherPets: 3}
    },
    "pet-interest": {
        "dog-interest": {dogs: 5},
        "cat-interest": {cats: 5},
        "other-interest": {otherPets: 5}
    },
    "grooming-importance": {
        "low-maintenance": {lowMaintenance: 3},
        "moderate-maintenance": {modMaintenance: 3, lowMaintenance: 2},
        "high-maintenance": {highMaintenance: 3, modMaintenance: 2, lowMaintenance: 1}
    },
    "children-or-pets": {
        "children-and-pets": {friendly: 3},
        "children-or-other-pets": {friendly: 3},
        "no-children-or-pets": {independent: 3, friendly: 2}
    },
    allergies: {
        "allergic": {hypoallergenic: 3},
        "not-allergic": {}

    },
    "pet-temper": {
        "calm-pet": {calm: 3},
        "playful-pet": {playful: 3},
        "protective-pet": {protective: 3}
    },
    noise: {
        "quiet-noise": {lowNoise: 3, mediumNoise: 2},
        "moderate-noise": {lowNoise: 3, mediumNoise:3, noisy: 1},
        "noisy": {noisy: 3, mediumNoise: 3, lowNoise: 3}
    }

};

//petcare guides, each has a overview, nutrition, exercise, healthcare, and grooming section
const petCare = {
    //dogs
    labrador: {
        overview: "Labradors are intelligent, friendly, and energetic dogs that thrive with family and active lifestyles. They have an average lifespan of 10-12 years. The average weight for males is 65-80 lb (29-36 kg) and for females is 55-70 lb (25-32 kg)",
        nutrition: {
            overview: "High-quality dry dog food with balanced protein, fats, and carbs.",
            dailyIntake: "2.5-3 cups per day, divided into two meals.",
            supplements: "Glucosamine and omega-3 fatty acids for joint and coat health."
        },
        exercise: "Highly energetic—needs, at least 1 to 2 hours of physical and mental stimulation daily (walks, fetch, swimming).",
        healthcare: {
            commonIssues: "Hip dysplasia, elbow dysplasia, obesity.",
            preventiveMeasures: "Regular vet check-ups, maintain healthy weight, routine eye exams."
        },
        grooming: "Moderate shedding; brush 2-3 times per week and bathe as needed."
    },
    golden: {
        overview: "Golden Retrievers are friendly, intelligent, and loyal. They love human interaction and outdoor activity.",
        nutrition: {
            overview: "High-quality dry dog food with balanced protein, fats, and carbs.",
            dailyIntake: "2.5-3 cups per day, divided into two meals.",
            supplements: "Omega-3 fatty acids for coat health and joint support."
        },
        exercise: "At least 1-2 hours of daily activity, including walks, play, and swimming.",
        healthcare: {
            commonIssues: "Hip dysplasia, elbow dysplasia, skin allergies, heart conditions.",
            preventiveMeasures: "Regular vet check-ups, maintain healthy weight, routine eye exams."
        },
        grooming: "Heavy shedding; brush 3-4 times per week and bathe as needed."
    },
    frenchBulldog: {
        overview: "French Bulldogs are affectionate, playful, and low-energy dogs. They adapt well to apartment living.",
        nutrition: {
            overview: "High-quality dry dog food appropriate for small breeds.",
            dailyIntake: "1-1.5 cups per day, divided into two meals.",
            supplements: "Glucosamine and omega-3 fatty acids for joint and coat health."
        },
        exercise: "Short daily walks and light play; avoid overheating due to brachycephalic face.",
        healthcare: {
            commonIssues: "Brachycephalic syndrome, hip dysplasia, obesity.",
            preventiveMeasures: "Regular vet check-ups, maintain healthy weight, avoid excessive heat."
        },
        grooming: "Low shedding; brush 1-2 times per week and bathe as needed."
    },
    german: {
        overview: "German Shepherds are intelligent, loyal, and versatile working dogs. They require consistent training and mental stimulation.",
        nutrition: {
            overview: "High-quality dry dog food for large, active breeds.",
            dailyIntake: "3-4 cups per day, divided into two meals.",
            supplements: "Glucosamine and omega-3 fatty acids for joint and coat health."
        },
        exercise: "At least 1-2 hours of daily activity, including walks, runs, and training exercises.",
        healthcare: {
            commonIssues: "Hip dysplasia, elbow dysplasia, degenerative myelopathy.",
            preventiveMeasures: "Regular vet check-ups, maintain healthy weight, routine eye exams."
        },
        grooming: "Moderate shedding; brush 2-3 times per week and bathe as needed."
    },
    poodle: {
        overview: "Standard Poodles are intelligent, active, and hypoallergenic. They excel in obedience and dog sports.",
        nutrition: {
            overview: "High-quality dry dog food with balanced protein and fats.",
            dailyIntake: "2.5-3 cups per day, divided into two meals.",
            supplements: "Glucosamine and omega-3 fatty acids for joint and coat health."
        },
        exercise: "At least 1-2 hours of daily activity including walks, play, and mental stimulation.",
        healthcare: {
            commonIssues: "Hip dysplasia, progressive retinal atrophy, epilepsy.",
            preventiveMeasures: "Regular vet check-ups, maintain healthy weight, routine eye exams."
        },
        grooming: "High grooming needs; daily brushing and regular professional grooming."
    },
    pom: {
        overview: "Pomeranians are small, lively, and affectionate dogs. They make great companions for families and individuals.",
        nutrition: {
            overview: "High-quality dry dog food for small breeds.",
            dailyIntake: "0.5-1 cup per day, divided into two meals.",
            supplements: "Glucosamine and omega-3 fatty acids for joint and coat health."
        },
        exercise: "Short daily walks and indoor play; they are energetic despite small size.",
        healthcare: {
            commonIssues: "Dental issues, patellar luxation, tracheal collapse.",
            preventiveMeasures: "Regular vet check-ups, maintain healthy weight, routine dental care."
        },
        grooming: "Moderate shedding; brush 2-3 times per week and bathe as needed."
    },

    //cats
    persian: {
        overview:,
        nutrition:,
        exercise:,
        healthcare:,
        grooming:,
    },
    siamese: {
        overview:,
        nutrition:,
        exercise:,
        healthcare:,
        grooming:,
    },
    maineCoon: {
        overview:,
        nutrition:,
        exercise:,
        healthcare:,
        grooming:,
    },
    exotic: {
        overview:,
        nutrition:,
        exercise:,
        healthcare:,
        grooming:,
    },
    american: {
        overview:,
        nutrition:,
        exercise:,
        healthcare:,
        grooming:,
    },

    //other pets
    rabbit: {
        overview:,
        nutrition:,
        exercise:,
        healthcare:,
        grooming:,
    },
    hamster: {
        overview:,
        nutrition:,
        exercise:,
        healthcare:,
        grooming:,
    },
    parrot: {
        overview:,
        nutrition:,
        exercise:,
        healthcare:,
        grooming:,
    },
    gecko: {
        overview:,
        nutrition:,
        exercise:,
        healthcare:,
        grooming:,
    },

}

function bestPet(scores) {
    let bestScore = -Infinity;
    let winners = [];

    for(const [pet, score] of Object.entries(scores)){
        if(score > bestScore){
            bestScore = score;
            winners = [pet];
        }
        else if (score === bestScore) {
            winners.push(pet);
        }
    }
    return winners;
}
const topPets = bestPet(scores);
if(topPets.length == 1){
    console.log("Best match:", topPets[0]);
}
else {
    console.log("Multiple matches:", topPets.join(", "));
}