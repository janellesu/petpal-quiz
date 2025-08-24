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
        overview: "Labradors are friendly, outgoing, and active dogs, known for being great family pets and working companions.",
        lifespan: "10-12 years",
        weight: "55-80 lbs",
        nutrition: {
            overview: "Balanced diet with protein, healthy fats, and fiber. Labradors are prone to obesity, so portion control is important.",
            dailyIntake: "2.5-3 cups of high-quality kibble split into 2 meals per day (adjust for activity level).",
            supplements: "Omega-3 for joints/coat, glucosamine for hip health, probiotics for digestion."
        },
        exercise: "At least 1-2 hours daily (walking, running, swimming, fetch).",
        healthcare: {
            commonIssues: "Hip/elbow dysplasia, obesity, ear infections, arthritis.",
            preventiveMeasures: "Weight management, regular vet visits, ear cleaning, joint supplements."
        },
        grooming: "Brush 2-3 times per week; bathe monthly; clean ears weekly."
    },
    golden: {
        overview: "Golden Retrievers are intelligent, loyal, and affectionate dogs, well-suited for families and therapy work.",
        lifespan: "10-12 years",
        weight: "55-75 lbs",
        nutrition: {
            overview: "High-quality kibble or fresh food diet with lean protein and healthy fats.",
            dailyIntake: "2-3 cups of kibble split into 2 meals per day.",
            supplements: "Fish oil for coat health, glucosamine/chondroitin for joints, antioxidants for immunity."
        },
        exercise: "1-1.5 hours daily (walking, swimming, fetch, agility).",
        healthcare: {
            commonIssues: "Hip/elbow dysplasia, cancer, skin allergies, hypothyroidism.",
            preventiveMeasures: "Regular vet screenings, balanced diet, joint support, weight control."
        },
        grooming: "Brush every other day; trim nails monthly; bathe every 6-8 weeks."
    },
    frenchBulldog: {
        overview: "French Bulldogs are affectionate, playful companion dogs with a brachycephalic (short-nosed) build.",
        lifespan: "10-12 years",
        weight: "16-28 lbs",
        nutrition: {
            overview: "Moderate-calorie diet to prevent obesity, with easily digestible protein.",
            dailyIntake: "1-1.5 cups of high-quality kibble split into 2 meals daily.",
            supplements: "Omega-3 for skin, probiotics for digestion, joint support for mobility."
        },
        exercise: "30-45 minutes of light play or walks daily (avoid overheating).",
        healthcare: {
            commonIssues: "Breathing issues, skin allergies, hip dysplasia, obesity.",
            preventiveMeasures: "Keep cool, monitor weight, regular vet care, wrinkle cleaning."
        },
        grooming: "Weekly brushing; clean wrinkles daily; bathe every 4-6 weeks."
    },
    german: {
        overview: "German Shepherds are intelligent, loyal working dogs often used in police, service, and protection roles.",
        lifespan: "9-13 years",
        weight: "50-90 lbs",
        nutrition: {
            overview: "High-protein diet to support active lifestyle; watch for joint health.",
            dailyIntake: "3-4 cups of high-quality kibble per day, split into 2 meals.",
            supplements: "Glucosamine/chondroitin for hips, omega-3 for coat/joints."
        },
        exercise: "At least 2 hours daily (running, agility, obedience training).",
        healthcare: {
            commonIssues: "Hip/elbow dysplasia, bloat (GDV), degenerative myelopathy.",
            preventiveMeasures: "Controlled feeding (smaller meals), joint support, regular vet screenings."
        },
        grooming: "Brush 2-3 times weekly (daily during shedding); bathe every 6-8 weeks."
    },
    poodle: {
        overview: "Poodles are intelligent, athletic, and hypoallergenic dogs available in toy, miniature, and standard sizes.",
        lifespan: "12-15 years",
        weight: "Toy: 6-9 lbs, Miniature: 15-17 lbs, Standard: 40-70 lbs",
        nutrition: {
            overview: "Balanced diet of protein, fiber, and fat; adjust portions by size.",
            dailyIntake: "Toy: ½-1 cup; Mini: 1-2 cups; Standard: 2.5-3.5 cups daily (split into 2 meals).",
            supplements: "Fish oil for coat, glucosamine for joints, probiotics for digestion."
        },
        exercise: "45-90 minutes daily (walks, play, agility, swimming).",
        healthcare: {
            commonIssues: "Hip dysplasia, eye issues, Addison’s disease, ear infections.",
            preventiveMeasures: "Regular vet visits, eye exams, ear cleaning, joint monitoring."
        },
        grooming: "Professional grooming every 4-6 weeks; daily brushing to prevent mats."
    },
    pom: {
        overview: "Pomeranians are small, energetic companion dogs with a fluffy double coat.",
        lifespan: "12-16 years",
        weight: "3-7 lbs",
        nutrition: {
            overview: "Small-breed diet with high-quality protein and calorie control.",
            dailyIntake: "¼-½ cup split into 2-3 meals daily.",
            supplements: "Omega-3 for coat, dental chews for teeth, joint support as they age."
        },
        exercise: "30-60 minutes daily (walks and indoor play).",
        healthcare: {
            commonIssues: "Dental disease, luxating patella, tracheal collapse.",
            preventiveMeasures: "Daily tooth brushing, weight control, regular vet care."
        },
        grooming: "Brush 3-4 times weekly; trim nails monthly; bathe every 4-6 weeks."
    },

    // --- CATS ---
    persian: {
        overview: "Persians are calm, affectionate cats with long, luxurious coats.",
        lifespan: "12-17 years",
        weight: "7-12 lbs",
        nutrition: {
            overview: "Balanced diet with protein and healthy fats, avoid obesity.",
            dailyIntake: "¼-½ cup of high-quality dry food, or 3-6 oz of wet food daily.",
            supplements: "Omega-3 for skin/coat, taurine for heart/vision."
        },
        exercise: "30-60 minutes daily (interactive play).",
        healthcare: {
            commonIssues: "Polycystic kidney disease, breathing issues, dental problems.",
            preventiveMeasures: "Regular vet exams, dental care, weight management."
        },
        grooming: "Daily brushing; face cleaning; bathe monthly."
    },
    siamese: {
        overview: "Siamese cats are vocal, affectionate, and highly social with striking blue eyes.",
        lifespan: "12-20 years",
        weight: "6-14 lbs",
        nutrition: {
            overview: "High-protein diet to support lean muscle mass.",
            dailyIntake: "¼-½ cup of dry food or 3-5 oz wet food daily.",
            supplements: "Taurine, probiotics for digestion."
        },
        exercise: "45-60 minutes daily (climbing, fetch, puzzle toys).",
        healthcare: {
            commonIssues: "Dental disease, respiratory issues, heart disease.",
            preventiveMeasures: "Regular dental care, vet screenings, maintain lean weight."
        },
        grooming: "Weekly brushing; routine ear cleaning."
    },
    maineCoon: {
        overview: "Maine Coons are large, gentle cats with playful and dog-like personalities.",
        lifespan: "12-15 years",
        weight: "10-25 lbs",
        nutrition: {
            overview: "Protein-rich diet suitable for large cats; monitor portions.",
            dailyIntake: "½-1 cup of dry food or 6-9 oz wet food daily.",
            supplements: "Glucosamine for joints, taurine for heart health."
        },
        exercise: "45-90 minutes daily (climbing trees, interactive play).",
        healthcare: {
            commonIssues: "Hip dysplasia, hypertrophic cardiomyopathy (HCM), obesity.",
            preventiveMeasures: "Cardiac screening, weight management, joint support."
        },
        grooming: "Brush 2-3 times weekly; bathe occasionally."
    },
    exotic: {
        overview: "Exotic Shorthairs are affectionate, easygoing cats similar to Persians but with shorter coats.",
        lifespan: "12-15 years",
        weight: "8-15 lbs",
        nutrition: {
            overview: "Balanced diet with protein and controlled calories.",
            dailyIntake: "¼-½ cup of dry food or 3-6 oz wet food daily.",
            supplements: "Omega-3 for coat, taurine for heart/vision."
        },
        exercise: "30-45 minutes daily (play sessions).",
        healthcare: {
            commonIssues: "Polycystic kidney disease, breathing issues, dental problems.",
            preventiveMeasures: "Vet screenings, weight control, dental care."
        },
        grooming: "Brush 2-3 times weekly; eye/face cleaning."
    },
    american: {
        overview: "American Shorthairs are friendly, adaptable cats with a strong build and hunting instincts.",
        lifespan: "15-20 years",
        weight: "8-15 lbs",
        nutrition: {
            overview: "High-quality, protein-rich diet with portion control.",
            dailyIntake: "¼-½ cup of dry food or 3-6 oz wet food daily.",
            supplements: "Taurine, omega-3 for coat, probiotics for digestion."
        },
        exercise: "30-60 minutes daily (hunting-style play).",
        healthcare: {
            commonIssues: "Dental issues, obesity, hypertrophic cardiomyopathy (HCM).",
            preventiveMeasures: "Regular dental care, weight management, vet screenings."
        },
        grooming: "Weekly brushing; routine nail trimming."
    },

    //other pets
    rabbit: {
        overview: "Rabbits are social, intelligent pets that enjoy companionship and need space to hop and play. They require careful diet management and regular attention.",
        lifespan: "8-12 years (some breeds up to 15)",
        weight: "2-6 lbs (depending on breed; some giants exceed 10 lbs)",
        nutrition: {
            overview: "Mainly hay-based diet with fresh vegetables and limited pellets.",
            dailyIntake: "Unlimited fresh hay; about 1/8-1/4 cup of high-fiber pellets per 5 lbs of body weight; 1-2 cups of leafy greens daily.",
            supplements: "Generally not required if diet is balanced; consult vet if deficiencies suspected."
        },
        exercise: "At least 3-4 hours of safe, supervised playtime outside their enclosure daily.",
        healthcare: {
            commonIssues: "Dental disease, gastrointestinal stasis, obesity, respiratory infections.",
            preventiveMeasures: "Regular dental checks, high-fiber diet, rabbit-safe environment, annual vet visits."
        },
        grooming: "Brush weekly (daily during shedding season); check nails monthly; avoid bathing unless medically necessary."
    },
    hamster: {
        overview: "Hamsters are small, nocturnal rodents that enjoy burrowing, running, and chewing. They are best kept as single pets.",
        lifespan: "2-3 years",
        weight: "1-7 oz (Syrian up to 7 oz, dwarf species 1-2 oz)",
        nutrition: {
            overview: "Balanced commercial hamster mix with occasional fresh foods.",
            dailyIntake: "1-2 tablespoons of hamster mix per day; small portions of fresh fruits/veggies a few times weekly.",
            supplements: "Not usually required if fed a complete mix; occasional chew sticks for dental health."
        },
        exercise: "Access to a solid-surface exercise wheel; daily enrichment with tunnels, toys, and chew items.",
        healthcare: {
            commonIssues: "Wet tail (diarrhea), respiratory infections, dental overgrowth.",
            preventiveMeasures: "Clean cage regularly, provide chew toys, avoid sudden diet changes, and reduce stress."
        },
        grooming: "Generally self-groom; provide sand bath for dwarf hamsters; no water baths."
    },
    parrot: {
        overview: "Parrots are highly intelligent, social birds that need constant mental stimulation and social interaction. Lifespan varies widely by species.",
        lifespan: "20-80 years (small parrots ~20 years; large macaws 60-80+ years)",
        weight: "1-4 oz (budgies) up to 2-4 lbs (large macaws/cockatoos)",
        nutrition: {
            overview: "Pellet-based diet supplemented with fresh fruits, vegetables, and occasional seeds.",
            dailyIntake: "Pellets ~60-70% of diet; 1-2 small servings of fresh produce daily; seeds/nuts only as treats.",
            supplements: "Calcium (especially for breeding hens) and vitamin D if not exposed to sunlight; consult avian vet."
        },
        exercise: "At least 2-3 hours of supervised out-of-cage time daily; interactive toys and foraging activities.",
        healthcare: {
            commonIssues: "Feather plucking, obesity, nutritional deficiencies, psittacosis (parrot fever).",
            preventiveMeasures: "Regular avian vet visits, balanced diet, mental stimulation, clean environment."
        },
        grooming: "Provide access to bathing (mist spray or shallow dish); trim nails/beak if overgrown (by vet); clip wings only if recommended."
    },
    gecko: {
        overview: "Leopard geckos are hardy, nocturnal reptiles that are relatively easy to care for. They require a warm, dry environment and proper enclosure setup.",
        lifespan: "10-20 years in captivity (with good care)",
        weight: "1.5-3 oz (adult average)",
        nutrition: {
            overview: "Live insect diet; primarily crickets and mealworms, dusted with supplements.",
            dailyIntake: "Feed juveniles daily (5-7 insects); adults every other day (6-10 insects). Remove uneaten insects after 15-20 minutes.",
            supplements: "Calcium with vitamin D3 dusted on insects 2-3 times weekly; multivitamin once weekly."
        },
        exercise: "Exploration within a properly sized enclosure (20+ gallon tank recommended); not high-activity animals.",
        healthcare: {
            commonIssues: "Metabolic bone disease, impaction, shedding issues, respiratory infections.",
            preventiveMeasures: "Proper heat gradient (88-92°F basking spot), humidity control, supplement use, clean tank."
        },
        grooming: "No brushing needed; provide humid hide to assist with shedding; check toes and tail for stuck shed."
    }
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