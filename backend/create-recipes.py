import requests


print("RUNNING RECIPE CREATION SCRIPT")
# set the base URL of the Django API backend
base_url = 'http://127.0.0.1:8000'
# set the user data for registration
user_data = {
    'username': 'masterchef',
    'email': 'masterchef@p3.com',
    'password': 'testpassword123'
}

# make a POST request to the user registration endpoint
register_url = f'{base_url}/api/account/register/'
response = requests.post(register_url, data=user_data)

# check if the registration was successful
if response.status_code != 201:
    print('User registration failed:', response.text)
    exit()

print('User registered successfully.')

# set the user data for login


user_data = {
    'username': 'masterchef',
    'password': 'testpassword123'
}

# make a POST request to the user login endpoint
login_url = f'{base_url}/api/account/login/'
response = requests.post(login_url, json=user_data)

# check if the login was successful
if response.status_code != 200:
    print('User login failed:', response.text)
    exit()

print('User logged in successfully.')

# extract the authentication token from the response
token = response.json()['token']

recipes = [{
    "name": "Spaghetti Carbonara",
    "description": "This classic Italian dish is made with spaghetti, pancetta or bacon, eggs, and cheese.",
    "serving_size": 4,
    "prep_time": 17,
    "cook_time": 20,
    "diets": [{"name": "Gluten-Free"}, {"name": "Low Carb"}],
    "cuisines": [{"name": "Italian"}],
    "ingredients": [
        {"name": "spaghetti", "quantity": 400},
        {"name": "pancetta", "quantity": 150},
        {"name": "eggs", "quantity": 4},
        {"name": "pecorino romano cheese", "quantity": 100}
    ],
    "steps": [
        {
        "description": "Cook the spaghetti in a large pot of boiling salted water until al dente.",
        "images": [],
        "videos": [],
        "cook_time": 10,
        "prep_time": "5"
        },
        {
        "description": "Meanwhile, cook the pancetta in a large skillet over medium heat until crisp, about 8 minutes. Remove the pancetta with a slotted spoon and set aside.",
        "images": [],
        "videos": [],
        "cook_time": 8,
        "prep_time": "5"
        },
        {
        "description": "In a mixing bowl, beat the eggs and mix in the pecorino cheese and black pepper.",
        "images": [],
        "videos": [],
        "cook_time": 0,
        "prep_time": "5"
        },
        {
        "description": "Drain the spaghetti and return it to the pot. Pour in the egg mixture and pancetta, and toss until the spaghetti is coated and the eggs are cooked through, about 2 minutes. Serve immediately.",
        "images": [],
        "videos": [],
        "cook_time": 2,
        "prep_time": "2"
        }
    ],
    "images": []
},
{
    "name": "Chicken Alfredo",
    "description": "A classic Italian-American dish made with fettuccine, chicken, and a creamy Parmesan sauce.",
    "serving_size": 4,
    "prep_time": 23,
    "cook_time": 30,
    "diets": [{"name": "Gluten-Free"}],
    "cuisines": [{"name": "Italian"}, {"name": "American"}],
    "ingredients": [
        {"name": "fettuccine", "quantity": 400},
        {"name": "boneless, skinless chicken breasts", "quantity": 500},
        {"name": "butter", "quantity": 100},
        {"name": "heavy cream", "quantity": 200},
        {"name": "Parmesan cheese", "quantity": 100},
    ],
    "steps": [
        {
            "description": "Cook the fettuccine in a large pot of boiling salted water until al dente.",
            "images": [],
            "videos": [],
            "cook_time": 10,
            "prep_time": "5"
        },
        {
            "description": "While the pasta is cooking, heat the butter in a large skillet over medium-high heat. Season the chicken breasts with salt and pepper, then add them to the skillet and cook until golden brown on both sides and cooked through, about 6 minutes per side. Remove the chicken from the skillet and set aside.",
            "images": [],
            "videos": [],
            "cook_time": 12,
            "prep_time": "10"
        },
        {
            "description": "In the same skillet, reduce the heat to medium and add the heavy cream. Bring to a simmer and cook until the cream has reduced slightly, about 5 minutes. Stir in the Parmesan cheese and cook until melted and the sauce has thickened, about 2 minutes. Season with salt and pepper to taste.",
            "images": [],
            "videos": [],
            "cook_time": 7,
            "prep_time": "3"
        },
        {
            "description": "Slice the chicken breasts into thin strips. Drain the fettuccine and return it to the pot. Pour the Alfredo sauce over the pasta and toss to coat. Top with the sliced chicken and serve immediately.",
            "images": [],
            "videos": [],
            "cook_time": 1,
            "prep_time": "5"
        }
    ],
    "images": []
},
{
    "name": "Vegetable Stir-Fry",
    "description": "A quick and easy vegetarian stir-fry packed with colorful veggies and served over rice.",
    "serving_size": 4,
    "prep_time": 22,
    "cook_time": 28,
    "diets": [{"name": "Vegetarian"}, {"name": "Vegan"}],
    "cuisines": [{"name": "South-East Asian"}],
    "ingredients": [
        {"name": "rice", "quantity": 1.5},
        {"name": "water", "quantity": 3},
        {"name": "vegetable oil", "quantity": 2},
        {"name": "onion", "quantity": 1},
        {"name": "garlic", "quantity": 3},
        {"name": "ginger", "quantity": 1},
        {"name": "broccoli florets", "quantity": 2},
        {"name": "red bell pepper", "quantity": 1},
        {"name": "carrots", "quantity": 2},
        {"name": "soy sauce", "quantity": 0.25},
        {"name": "rice vinegar", "quantity": 2},
        {"name": "sesame oil", "quantity": 1},
        {"name": "cornstarch", "quantity": 2},
        {"name": "water", "quantity": 0.25}
    ],
    "steps": [
        {
            "description": "Cook the rice according to package instructions.",
            "images": [],
            "videos": [],
            "cook_time": 15,
            "prep_time": "5"
        },
        {
            "description": "While the rice is cooking, heat the vegetable oil in a large skillet over medium-high heat. Add the onion, garlic, and ginger and cook until softened, about 3 minutes.",
            "images": [],
            "videos": [],
            "cook_time": 3,
            "prep_time": "3"
        },
        {
            "description": "Add the broccoli, red bell pepper, and carrots to the skillet and cook until tender-crisp, about 5-7 minutes.",
            "images": [],
            "videos": [],
            "cook_time": 7,
            "prep_time": "5"
        },
        {
            "description": "In a small bowl, whisk together the soy sauce, rice vinegar, sesame oil, cornstarch, and water.",
            "images": [],
            "videos": [],
            "cook_time": 0,
            "prep_time": "2"
        },
        {
            "description": "Pour the sauce over the vegetables and toss to coat. Cook for an additional 2-3 minutes, until the sauce has thickened and the vegetables are fully coated.",
            "images": [],
            "videos": [],
            "cook_time": 3,
            "prep_time": "2"
        },
        {
            "description": "Serve the stir-fry over rice and enjoy!",
            "images": [],
            "videos": [],
            "cook_time": 0,
            "prep_time": "5"
        }
    ],
    "images": []
},
{
    "name": "Kheer",
    "description": "A traditional Pakistani dessert made with milk, rice, and sugar, flavored with cardamom and garnished with nuts.",
    "serving_size": 6,
    "prep_time": 5,
    "cook_time": 70,
    "diets": [{"name": "Vegetarian"}],
    "cuisines": [{"name": "South Asian"}],
    "ingredients": [
        {"name": "whole milk", "quantity": 4},
        {"name": "basmati rice", "quantity": 0.25},
        {"name": "sugar", "quantity": 0.5},
        {"name": "cardamom pods", "quantity": 6},
        {"name": "almonds", "quantity": 0.25},
        {"name": "pistachios", "quantity": 0.25},
        {"name": "rose water", "quantity": 1}
    ],
    "steps": [
        {
        "description": "Rinse the rice and soak in water for 30 minutes. Drain and set aside.",
        "images": [],
        "videos": [],
        "cook_time": 0,
        "prep_time": "5"
        },
        {
        "description": "In a large pot, bring the milk to a boil over medium heat. Add the drained rice and cardamom pods, reduce heat to low, and simmer, stirring occasionally, until the rice is cooked and the milk has thickened, about 30-40 minutes.",
        "images": [],
        "videos": [],
        "cook_time": 40,
        "prep_time": "5"
        },
        {
        "description": "Add the sugar and continue to cook until dissolved, about 5 minutes. Stir in the rose water and remove from heat. Let cool slightly.",
        "images": [],
        "videos": [],
        "cook_time": 5,
        "prep_time": "30"
        },
        {
        "description": "Chop the almonds and pistachios and sprinkle over the kheer. Serve warm or chilled.",
        "images": [],
        "videos": [],
        "prep_time": "30"
        }
    ],
    "images": []
},
{
  "name": "Empanadas",
  "description": "A savory pastry filled with beef, onions, and spices, baked to perfection.",
  "serving_size": 4,
  "prep_time": 33,
  "cook_time": 45,
  "diets": [{"name": "Dairy-Free"}],
  "cuisines": [{"name": "Latin American"}],
  "ingredients": [
    {"name": "ground beef", "quantity": 500},
    {"name": "onion, chopped", "quantity": 1},
    {"name": "green bell pepper, chopped", "quantity": 1},
    {"name": "cumin", "quantity": 1},
    {"name": "paprika", "quantity": 1},
    {"name": "empanada dough", "quantity": 8}
  ],
  "steps": [
    {
      "description": "Preheat the oven to 400°F.",
      "images": [],
      "videos": [],
      "cook_time": 0,
      "prep_time": "5"
    },
    {
      "description": "In a skillet, brown the ground beef with the onion and green bell pepper. Drain off any excess fat. Season with cumin, paprika, salt, and black pepper to taste.",
      "images": [],
      "videos": [],
      "cook_time": 10,
      "prep_time": "10"
    },
    {
      "description": "On a lightly floured surface, roll out the empanada dough and cut into circles. Spoon some of the beef mixture onto each circle, leaving a small border. Fold the dough over the filling and press the edges to seal. Crimp the edges with a fork to create a decorative pattern.",
      "images": [],
      "videos": [],
      "cook_time": 15,
      "prep_time": "15"
    },
    {
      "description": "Place the empanadas on a baking sheet lined with parchment paper. Bake in the preheated oven for 15-20 minutes, or until golden brown. Serve hot.",
      "images": [],
      "videos": [],
      "cook_time": 20,
      "prep_time": "3"
    }
  ],
  "images": []
}, {
  "name": "Menemen",
  "description": "A traditional Turkish breakfast dish made with scrambled eggs, tomatoes, onions, and spices.",
  "serving_size": 2,
  "prep_time": 23,
  "cook_time": 21,
  "diets": [{"name": "Vegetarian"}],
  "cuisines": [{"name": "Mediterranean"}],
  "ingredients": [
    {"name": "olive oil", "quantity": 2},
    {"name": "onion", "quantity": 1},
    {"name": "tomato", "quantity": 2},
    {"name": "green pepper", "quantity": 1},
    {"name": "eggs", "quantity": 4},
    {"name": "red pepper flakes", "quantity": 0.5}
  ],
  "steps": [
    {
      "description": "Heat olive oil in a large pan over medium heat.",
      "images": [],
      "videos": [],
      "cook_time": 2,
      "prep_time": "2"
    },
    {
      "description": "Add the chopped onions to the pan and cook until they are soft and translucent, about 5 minutes.",
      "images": [],
      "videos": [],
      "cook_time": 5,
      "prep_time": "5"
    },
    {
      "description": "Add the chopped tomatoes and green pepper to the pan and cook until the vegetables are soft and the liquid has evaporated, about 8 minutes.",
      "images": [],
      "videos": [],
      "cook_time": 8,
      "prep_time": "8"
    },
    {
      "description": "Crack the eggs into the pan and scramble them with a spatula. Cook until the eggs are set, about 5 minutes.",
      "images": [],
      "videos": [],
      "cook_time": 5,
      "prep_time": "5"
    },
    {
      "description": "Season the menemen with salt, black pepper, and red pepper flakes, to taste.",
      "images": [],
      "videos": [],
      "cook_time": 1,
      "prep_time": "1"
    },
    {
      "description": "Serve the menemen hot, garnished with fresh parsley or cilantro, if desired.",
      "images": [],
      "videos": [],
      "cook_time": 0,
      "prep_time": "0"
    }
  ],
  "images": []
}, {
  "name": "Pavlova",
  "description": "A popular dessert from New Zealand consisting of a meringue base topped with whipped cream and fresh fruit.",
  "serving_size": 8,
  "prep_time": 35,
  "cook_time": 90,
  "diets": [{"name": "Gluten-Free"}],
  "cuisines": [{"name": "Oceanic"}],
  "ingredients": [
    {"name": "egg whites", "quantity": 6},
    {"name": "caster sugar", "quantity": 1.5},
    {"name": "cornflour", "quantity": 1 },
    {"name": "white vinegar", "quantity": 1 },
    {"name": "whipped cream", "quantity": 250},
    {"name": "fresh fruit", "quantity": 1}
  ],
  "steps": [
    {
      "description": "Preheat the oven to 150°C (300°F) and line a baking sheet with parchment paper.",
      "images": [],
      "videos": [],
      "cook_time": 0,
      "prep_time": "5"
    },
    {
      "description": "In a large mixing bowl, beat the egg whites with an electric mixer until stiff peaks form.",
      "images": [],
      "videos": [],
      "cook_time": 0,
      "prep_time": "5"
    },
    {
      "description": "Gradually add the caster sugar to the egg whites, one tablespoon at a time, continuing to beat until the mixture is thick and glossy.",
      "images": [],
      "videos": [],
      "cook_time": 0,
      "prep_time": "10"
    },
    {
      "description": "Sift the cornflour over the egg white mixture, add the white vinegar, and gently fold everything together using a spatula.",
      "images": [],
      "videos": [],
      "cook_time": 0,
      "prep_time": "5"
    },
    {
      "description": "Spoon the mixture onto the prepared baking sheet, forming a round shape with a slight indentation in the center.",
      "images": [],
      "videos": [],
      "cook_time": 0,
      "prep_time": "5"
    },
    {
      "description": "Bake in the preheated oven for 90 minutes, or until the pavlova is crisp on the outside and soft on the inside. Turn off the oven and leave the pavlova to cool completely inside the oven.",
      "images": [],
      "videos": [],
      "cook_time": 90,
      "prep_time": "0"
    },
    {
      "description": "Once the pavlova has cooled, transfer it to a serving plate and top with whipped cream and fresh fruit.",
      "images": [],
      "videos": [],
      "cook_time": 0,
      "prep_time": "5"
    }
  ],
  "images": []
},
{
   "name": "Borsch",
   "description": "A hearty vegetable soup, originally from Ukraine, made with beets and other vegetables.",
   "serving_size": 6,
   "prep_time": 60,
   "cook_time": 125,
   "diets": [{"name": "Vegetarian"}, {"name": "Vegan"}],
   "cuisines": [{"name": "Eastern European"}],
   "ingredients": [
      {"name": "beets", "quantity": 4},
      {"name": "carrots", "quantity": 2},
      {"name": "onions", "quantity": 1},
      {"name": "garlic cloves", "quantity": 2},
      {"name": "cabbage", "quantity": 1/2},
      {"name": "potatoes", "quantity": 2},
      {"name": "tomato paste", "quantity": 2},
      {"name": "vegetable stock", "quantity": 6},
      {"name": "bay leaves", "quantity": 2},
      {"name": "fresh dill", "quantity": 1},
      {"name": "sour cream", "quantity": 1},
      {"name": "salt", "quantity": 1},
      {"name": "black pepper", "quantity": 1},
      {"name": "vegetable oil", "quantity": 1}
   ],
   "steps": [
      {
         "description": "Peel and chop the beets, carrots, onions, and garlic. Shred the cabbage. Peel and dice the potatoes.",
         "images": [],
         "videos": [],
         "cook_time": 0,
         "prep_time": "15"
      },
      {
         "description": "Heat some vegetable oil in a large pot over medium-high heat. Add the chopped onions and garlic and sauté until fragrant, about 2 minutes. Add the chopped beets, carrots, and shredded cabbage, and cook for another 5 minutes.",
         "images": [],
         "videos": [],
         "cook_time": 5,
         "prep_time": "5"
      },
      {
         "description": "Add the diced potatoes, tomato paste, vegetable stock, and bay leaves. Season with salt and black pepper. Bring to a boil, then reduce the heat to low and let simmer for 2 hours, stirring occasionally.",
         "images": [],
         "videos": [],
         "cook_time": 120,
         "prep_time": "10"
      },
      {
         "description": "Remove the bay leaves and discard. Serve the borsch hot, garnished with fresh dill and a dollop of sour cream.",
         "images": [],
         "videos": [],
         "cook_time": 0,
         "prep_time": "30"
      }
   ],
   "images": []
}, {
   "name": "Sarmale",
   "description": "Sarmale is a traditional Romanian dish of stuffed cabbage rolls, usually served with polenta and sour cream.",
   "serving_size": 6,
   "prep_time": 45,
   "cook_time": 190,
   "diets": [{"name": "Gluten-Free"}],
   "cuisines": [{"name": "Eastern European"}],
   "ingredients": [
      {"name": "head of cabbage", "quantity": 1},
      {"name": "minced pork", "quantity": 500},
      {"name": "rice", "quantity": 1},
      {"name": "onion", "quantity": 2},
      {"name": "tomato paste", "quantity": 2},
      {"name": "paprika", "quantity": 2},
      {"name": "salt", "quantity": 1},
      {"name": "black pepper", "quantity": 1}
   ],
   "steps": [
      {
         "description": "Bring a large pot of salted water to a boil. Add the head of cabbage and cook until the leaves are tender and pliable, about 10 minutes. Remove the cabbage from the pot and let cool. Once cool enough to handle, carefully remove the leaves one at a time and trim off the thick center stem. Reserve the larger leaves for the cabbage rolls and chop the smaller ones.",
         "images": [],
         "videos": [],
         "cook_time": 10,
         "prep_time": 20
      },
      {
         "description": "In a large bowl, mix together the minced pork, rice, chopped onion, chopped cabbage leaves, tomato paste, paprika, salt, and pepper until well combined.",
         "images": [],
         "videos": [],
         "cook_time": 0,
         "prep_time": 10
      },
      {
         "description": "Preheat the oven to 350°F (175°C).",
         "images": [],
         "videos": [],
         "cook_time": 0,
         "prep_time": 5
      },
      {
         "description": "To assemble the cabbage rolls, place a small amount of the pork and rice filling in the center of a cabbage leaf. Fold the sides of the leaf over the filling and roll up tightly, tucking in the ends. Repeat with the remaining filling and cabbage leaves.",
         "images": [],
         "videos": [],
         "cook_time": 0,
         "prep_time": 10
      },
      {
         "description": "Place the cabbage rolls in a large oven-safe pot or baking dish. Pour enough water into the pot or dish to just cover the rolls. Cover with a lid or aluminum foil and bake in the preheated oven for 2-3 hours, or until the cabbage is tender and the filling is cooked through.",
         "images": [],
         "videos": [],
         "cook_time": 180,
         "prep_time": 0
      },
      {
         "description": "Serve the sarmale hot with polenta and sour cream.",
         "images": [],
         "videos": [],
         "cook_time": 0,
         "prep_time": 0
      }
   ],
   "images": []
}, 
{
    "name": "Chicken Pulao",
    "description": "A flavorful rice dish made with chicken, spices, and vegetables.",
    "serving_size": 4,
    "prep_time": 35,
    "cook_time": 50,
    "diets": [
    {"name": "Gluten-Free"}
    ],
    "cuisines": [
    {"name": "South Asian"}
    ],
    "ingredients": [
    {"name": "basmati rice", "quantity": 2},
    {"name": "chicken thighs", "quantity": 500},
    {"name": "vegetable oil", "quantity": 50},
    {"name": "onion, finely chopped", "quantity": 1},
    {"name": "garlic cloves, minced", "quantity": 2},
    {"name": "ginger, minced", "quantity": 1},
    {"name": "tomatoes, diced", "quantity": 2},
    {"name": "green chili pepper, chopped", "quantity": 1},
    {"name": "coriander leaves, chopped", "quantity": 1},
    {"name": "cumin powder", "quantity": 1},
    {"name": "coriander powder", "quantity": 1},
    {"name": "turmeric powder", "quantity": 2},
    {"name": "garam masala", "quantity": 1},
    {"name": "salt", "quantity": 1},
    {"name": "water", "quantity": 4}
    ],
    "steps": [
    {
    "description": "Wash the rice and soak in water for 20 minutes.",
    "images": [],
    "videos": [],
    "prep_time": "20",
    "cook_time": "0"
    },
    {
    "description": "Heat the oil in a pot and sauté the onion until translucent. Add the garlic and ginger and sauté for another minute.",
    "images": [],
    "videos": [],
    "prep_time": "5",
    "cook_time": 10
    },
    {
    "description": "Add the chicken and sauté until browned on all sides.",
    "images": [],
    "videos": [],
    "prep_time": "5",
    "cook_time": 10
    },
    {
    "description": "Add the tomatoes, green chili pepper, coriander leaves, and spices (cumin powder, coriander powder, turmeric powder, garam masala, and salt). Mix well and sauté for 2-3 minutes.",
    "images": [],
    "videos": [],
    "prep_time": "5",
    "cook_time": 5
    },
    {
    "description": "Add the soaked rice and water. Bring to a boil, then reduce the heat to low and cover the pot. Cook for 20-25 minutes or until the rice is fully cooked.",
    "images": [],
    "videos": [],
    "prep_time": "0",
    "cook_time": 25
    },
    {
    "description": "Fluff the rice with a fork and serve hot.",
    "images": [],
    "videos": [],
    "prep_time": "0",
    "cook_time": 0
    }
    ],
    "images": []
},
{
   "name": "Ambuyat",
   "description": "Ambuyat is a traditional dish from Brunei and Sabah, Malaysia. It is made from sago starch and usually eaten with a variety of side dishes.",
   "serving_size": 4,
   "prep_time": 10,
   "cook_time": 20,
   "diets": [{"name": "Gluten-Free"}],
   "cuisines": [{"name": "South-East Asian"}],
   "ingredients": [
      {"name": "sago starch", "quantity": 200},
      {"name": "water", "quantity": 1},
   ],
   "steps": [
      {
         "description": "In a large pot, bring the water to a boil.",
         "images": [],
         "videos": [],
         "cook_time": 5,
         "prep_time": "1"
      },
      {
         "description": "Slowly add the sago starch to the boiling water while stirring constantly. Cook for 10-15 minutes until the mixture thickens and becomes translucent.",
         "images": [],
         "videos": [],
         "cook_time": 15,
         "prep_time": "5"
      },
      {
         "description": "Remove the pot from the heat and let it cool for a few minutes. Use a traditional wooden utensil called a chandas to stir the mixture until it becomes smooth and elastic.",
         "images": [],
         "videos": [],
         "cook_time": 0,
         "prep_time": "2"
      },
      {
         "description": "Transfer the ambuyat to a serving bowl and serve with a variety of side dishes, such as grilled fish, beef, chicken, or vegetables.",
         "images": [],
         "videos": [],
         "cook_time": 0,
         "prep_time": "2"
      }
   ],
   "images": []
}, {
   "name": "Poulet à la Moambé",
   "description": "Poulet à la Moambé is a classic Congolese dish made with chicken, palm nut pulp, and a variety of vegetables.",
   "serving_size": 6,
   "prep_time": 37,
   "cook_time": 85,
   "diets": [{"name": "Gluten-Free"}, {"name": "Dairy-Free"}],
   "cuisines": [{"name": "Central African"}],
   "ingredients": [
      {"name": "chicken", "quantity": 1.5},
      {"name": "palm nut pulp", "quantity": 800},
      {"name": "onion", "quantity": 1},
      {"name": "garlic cloves", "quantity": 4},
      {"name": "ginger", "quantity": 2},
      {"name": "red bell pepper", "quantity": 1},
      {"name": "habanero pepper", "quantity": 1},
      {"name": "eggplant", "quantity": 1},
      {"name": "okra", "quantity": 10},
   ],
   "steps": [
      {
         "description": "Season the chicken with salt and black pepper.",
         "images": [],
         "videos": [],
         "cook_time": 0,
         "prep_time": "5"
      },
      {
         "description": "In a large pot, heat some palm oil over medium heat. Add the chicken and brown on all sides. Remove the chicken from the pot and set aside.",
         "images": [],
         "videos": [],
         "cook_time": 20,
         "prep_time": "10"
      },
      {
         "description": "In the same pot, sauté the onion, garlic, ginger, red bell pepper, and habanero pepper until soft and fragrant.",
         "images": [],
         "videos": [],
         "cook_time": 10,
         "prep_time": "5"
      },
      {
         "description": "Add the palm nut pulp to the pot and stir to combine. Cook for 5-10 minutes, stirring occasionally.",
         "images": [],
         "videos": [],
         "cook_time": 10,
         "prep_time": "5"
      },
      {
         "description": "Return the chicken to the pot and add enough water to cover. Bring to a simmer and cook for 20-30 minutes, or until the chicken is fully cooked.",
         "images": [],
         "videos": [],
         "cook_time": 30,
         "prep_time": "5"
      },
      {
         "description": "Add the eggplant and okra to the pot and cook for an additional 10-15 minutes, or until the vegetables are tender.",
         "images": [],
         "videos": [],
         "cook_time": 15,
         "prep_time": "5"
      },
      {
         "description": "Season with salt and black pepper to taste. Serve hot with rice or fufu.",
         "images": [],
         "videos": [],
         "cook_time": 0,
         "prep_time": "2"
      }
   ],
   "images": []
},
{
    "name": "Palusami",
    "description": "A traditional dish from Samoa made with taro leaves, coconut cream, and onion.",
    "serving_size": 4,
    "prep_time": 30,
    "cook_time": 70,
    "diets": [{"name": "Vegetarian"}],
    "cuisines": [{"name": "Oceanic"}],
    "ingredients": [
        {"name": "taro leaves", "quantity": 1.5},
        {"name": "coconut cream", "quantity": 1},
        {"name": "onion", "quantity": 1},
    ],
    "steps": [
        {
            "description": "Wash and remove the stalks from the taro leaves. Cut the leaves into small pieces and set aside.",
            "images": [],
            "videos": [],
            "prep_time": "10",
            "cook_time": 0
        },
        {
            "description": "Peel and slice the onion. In a large bowl, mix together the taro leaves, sliced onion, and salt.",
            "images": [],
            "videos": [],
            "prep_time": "5",
            "cook_time": 0
        },
        {
            "description": "In a separate bowl, mix together the coconut cream and a pinch of salt.",
            "images": [],
            "videos": [],
            "prep_time": "5",
            "cook_time": 0
        },
        {
            "description": "Take a piece of taro leaf and place it in the center of a piece of aluminum foil. Spoon a tablespoon of coconut cream over the taro leaf, then add another piece of taro leaf on top. Repeat until you have a small stack of leaves, ending with a spoonful of coconut cream on top. Wrap the aluminum foil tightly around the stack, creating a small parcel. Repeat until all the taro leaves have been used.",
            "images": [],
            "videos": [],
            "prep_time": "10",
            "cook_time": 40
        },
        {
            "description": "Place the parcels in a pot and cover with water. Bring to a boil and then reduce the heat to a simmer. Cook for 20-30 minutes, or until the taro leaves are tender and the coconut cream has thickened.",
            "images": [],
            "videos": [],
            "prep_time": 0,
            "cook_time": 30
        },
        {
            "description": "Remove the parcels from the pot and let them cool for a few minutes before unwrapping. Serve hot with rice or bread.",
            "images": [],
            "videos": [],
            "prep_time": 0,
            "cook_time": 0
        }
    ],
    "images": []
},
{
    "name": "Cou-cou",
    "description": "A traditional Barbadian dish made from cornmeal and okra.",
    "serving_size": 4,
    "prep_time": 70,
    "cook_time": 40,
    "diets": [{"name": "Vegetarian"}],
    "cuisines": [{"name": "Caribbean"}],
    "ingredients": [
        {"name": "cornmeal", "quantity": 1.5},
        {"name": "okra", "quantity": 10},
        {"name": "water", "quantity": 4},
        {"name": "butter", "quantity": 50},
    ],
    "steps": [
        {
            "description": "Combine the cornmeal and water in a large pot and stir to combine. Add the okra and bring the mixture to a boil, stirring constantly to prevent lumps.",
            "images": [],
            "videos": [],
            "cook_time": 20,
            "prep_time": "10"
        },
        {
            "description": "Reduce the heat to low and continue to cook the mixture, stirring frequently, until it becomes thick and starts to pull away from the sides of the pot, about 10-15 minutes.",
            "images": [],
            "videos": [],
            "cook_time": 15,
            "prep_time": "30"
        },
        {
            "description": "Stir in the butter and salt to taste. Serve hot with your choice of sides, such as flying fish or steamed vegetables.",
            "images": [],
            "videos": [],
            "cook_time": 5,
            "prep_time": "30"
        }
    ],
    "images": []
},
{
   "name": "Ackee and Saltfish",
   "description": "Ackee and saltfish is a traditional Jamaican dish made with salted codfish and the fruit of the ackee tree. The dish is usually served for breakfast or brunch and is often accompanied by breadfruit, boiled green bananas, or fried dumplings.",
   "serving_size": 4,
   "prep_time": 22,
   "cook_time": 35,
   "diets": [{"name": "Gluten-Free"}],
   "cuisines": [{"name": "Caribbean"}],
   "ingredients": [
      {"name": "salt codfish", "quantity": 1},
      {"name": "ackee", "quantity": 2},
      {"name": "onion, chopped", "quantity": 1},
      {"name": "scallion, chopped", "quantity": 1},
      {"name": "thyme leaves", "quantity": 1},
      {"name": "garlic cloves, minced", "quantity": 2},
      {"name": "black pepper", "quantity": 1},
      {"name": "olive oil", "quantity": 2},
      {"name": "water", "quantity": 1}
   ],
   "steps": [
      {
         "description": "Soak the salt codfish overnight in cold water to remove excess salt. Drain and rinse the fish in cold water.",
         "images": [],
         "videos": [],
         "cook_time": 0,
         "prep_time": "12"
      },
      {
         "description": "In a large pot, bring the water to a boil. Add the salt codfish and simmer for 20 minutes until the fish is tender. Drain the fish and set aside.",
         "images": [],
         "videos": [],
         "cook_time": 20,
         "prep_time": "5"
      },
      {
         "description": "In a large skillet, heat the olive oil over medium heat. Add the onion, scallion, thyme, and garlic and sauté until the onion is soft and translucent.",
         "images": [],
         "videos": [],
         "cook_time": 5,
         "prep_time": "5"
      },
      {
         "description": "Add the salt codfish to the skillet and cook for 5 minutes, stirring occasionally.",
         "images": [],
         "videos": [],
         "cook_time": 5,
         "prep_time": 0
      },
      {
         "description": "Add the ackee to the skillet and cook for an additional 5 minutes, stirring occasionally. Season with black pepper to taste.",
         "images": [],
         "videos": [],
         "cook_time": 5,
         "prep_time": 0
      },
      {
         "description": "Serve hot with breadfruit, boiled green bananas, or fried dumplings.",
         "images": [],
         "videos": [],
         "cook_time": 0,
         "prep_time": 0
      }
   ],
   "images": []
}]

for recipe in recipes:
    # set the headers with the authentication token
    headers = {'Authorization': f'Token {token}'}

    # make a POST request to the recipe creation endpoint
    recipe_url = f'{base_url}/api/recipes/'
    response = requests.post(recipe_url, json=recipe, headers=headers)

    # check if the recipe creation was successful
    if response.status_code != 201:
        print(f'Recipe: {recipe["name"]} creation failed:', response.text)
        exit()

    print(f'Recipe: {recipe["name"]} created successfully.')