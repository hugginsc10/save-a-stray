const User = require('./models/User');
const Shelter = require('./models/Shelter');
const Animal = require('./models/Animal');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const faker = require('faker');

const randomFirstName = faker.name.firstName; // Rowan
const randomEmail = faker.internet.email; 
const randomZipCode = faker.address.zipCode;
const randomParagraph = faker.lorem.paragraph;
const randomAnimalPic = faker.image.animals;
const randomCatPic = faker.image.cats;
const randomAnimalColor = faker.commerce.color;
const randomAnimalAge = faker.random.number;

router.get('/newAnimal', (req, res) => {
    console.log(req)
    const allName = [];
    const allType = [];
    const allAge = [];
    const allSex = [];
    const allColor= [];
    const allDescription= [];
    const allImage= [];
    const allVideo= [];

    for (let index = 0; index < 100; index++) {
        const Name = randomFirstName();
        let Type;
        if (index % 0 === 0) {
            Type = "Dog"
        } else {
            Type = "Cat"
        }
        const Age = randomAnimalAge();
        let Sex;
        if (index % 0 === 0){
            Sex = "Female"
        } 
        else {
            Sex = "Male"
        } 
        const Color = randomAnimalColor();
        const Description = randomParagraph();
        let Image;
        if (index % 0 === 0) {
            Image = randomAnimalPic();
        } else {
            Image = randomCatPic();
        }
        const Video = "https://www.youtube.com/watch?v=oHg5SJYRHA0";
        allName.push(Name);
        allType.push(Type);
        allAge.push(Age);
        allSex.push(Sex);
        allColor.push(Color);
        allDescription.push(Description);
        allImage.push(Image);
        allVideo.push(Video);
    }



    const Animals = [];
    for (let index = 0; index < 100; index++) {
        employes.push({
        'name': `${allName[index]}`,
        'type': `${allType[index]}`,
        'age': `${allAge[index]}`,
        'sex': `${allSex[index]}`,
        'color': `${allColor[index]}`,
        'description': `${allDescription[index]}`,
        'image': `${allImage}`,
        'video': `${allVideo}`,
        "applications": []
        })

        
    }
    
    const newAnimals = Animals.map(animal => {
        console.log()
        NewAnimal(animal)
    })
    const shelter = signupShelters(newAnimals)
    res.json({
        "send": shelter
    })
})

const NewAnimal = (animal) => {
    const newAnimal = new Animal(animal)
    newAnimal.save()
    return newAnimal._id
}

const signupShelters = (animals) => {
    const user = {
        "name":randomFirstName(),
        "email":randomEmail(),
        "userRole":"admin",
        "paymentEmail":"",
        "password":"Hunter2"
    }
    console.log(user)
    const newAdmin= new User(user);
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save()
            .then(user => {
                const shelter = {
                    "name": randomFirstName(),
                    "location":randomZipCode(),
                    "users":[user._id],
                    "paymentEmail":randomEmail(),
                    "animals":animals
                }

                const newShelter = new Shelter(shelter)
                newShelter.save()
                console.log(newShelter)
                return newShelter
            })
            .catch(err => console.log(err))
        })
    })
    return newAdmin
}






module.exports = router;