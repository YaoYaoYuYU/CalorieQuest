const apiKey = 'nlFarY62IO8Tzsv9VKYnkg==UJyqd9bpyem8X1Sq';

function addFood() {
    const query = document.getElementById("food").value;
    const capitalizedQuery = capitalizeFirstLetter(query);
    console.log(capitalizedQuery);

    const br = document.createElement("br");
    document.getElementById("listOfFood").appendChild(br)

    appendToList("listOfFood", capitalizedQuery);
    fetchNutritionInfo(capitalizedQuery);
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function appendToList(listId, text) {
    const li = document.createElement("li");
    li.textContent = text;
    document.getElementById(listId).appendChild(li);
}

function fetchNutritionInfo(query) {
    $.ajax({
        method: 'GET',
        url: 'https://api.api-ninjas.com/v1/nutrition?query=' + query,
        headers: { 'X-Api-Key': apiKey },
        contentType: 'application/json',
        success: handleApiResponse,
        error: function(jqXHR) {
            console.error('Error: ', jqXHR.responseText);
        }
    });
}

function handleApiResponse(result) {
    console.log(result);
    const calories = result[0].calories;
    appendToList("listOfFood", "Calories: " + calories);

    const protein = result[0].protein_g;
    appendToList("listOfFood", "Protein: " + protein + " grams");

    const totalFat = result[0].fat_total_g;
    appendToList("listOfFood", "Total Fat: " + totalFat + " grams");

    const totalCarbs = result[0].carbohydrates_total_g;
    appendToList("listOfFood", "Total Carbs: " + totalCarbs + " grams");

    const servingSize = result[0].serving_size_g;
    appendToList("listOfFood", "Serving Size: " + servingSize + " grams");

    const fiber = result[0].fiber_g;
    appendToList("listOfFood", "Fiber: " + fiber + " grams");

    const sugar = result[0].sugar_g;
    appendToList("listOfFood", "Sugar: " + sugar + " grams");

    const cholesterol = result[0].cholesterol_mg;
    appendToList("listOfFood", "Cholesterol: " + cholesterol + " milligrams");

    const sodium = result[0].sodium_mg;
    appendToList("listOfFood", "Sodium: " + sodium + " milligrams");
}
