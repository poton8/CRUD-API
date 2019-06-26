var fs = require('fs')
var data = fs.readFileSync('FakeData.json')
words = JSON.parse(data)
var express = require('express')
var app = express()


//Show server is running
app.listen(3000, function listening(){
    console.log("listening")
})

//uses the html document inside the folder "Website"
app.use(express.static('Website'))


//Query for word in JSON file
app.get('/find/:word', findWord)

function findWord(request, response){
    data = request.params
    word = data.word
    if (word in words){
        response.send(word)
    }
    else{
        response.send("word is not here")
    }
}

//Create new word to add to JSON file
app.get('/create/:word/:score?',function sendWord(request, response){
    var data = request.params
    var word = data.word
    var score = Number(data.score)
    if (!score){
        response.send("number is required")
    }

    else{
        words[word] = score
        var data = JSON.stringify(words,null,2)
        fs.writeFile('FakeData.json',data,finished)
        

        function finished(err){
            console.log("No errors")
            response.send("thank you for your word")
        }
    }
})

//Read all data in JSON File
app.get('/readAll',function readAll(request, response){
    response.send(words)
})

//Update a words score in JSON file
app.get('/update/:word/:score', function updateScore(request,response){
    var data = request.params
    var word = data.word
    var score = Number(data.score)

    if (word in words){
        words[word] = score
        var data = JSON.stringify(words, null, 2)
        fs.writeFile('FakeData.json',data,function complete(err){
            response.send("word updated")
        })
    }
    else{
        response.send("Word you are updating does not exist")
    }
})

//delete a word in the JSON file
app.get('/delete/:word', function deleteWord(request,response){
    var data = request.params
    var word = data.word

    if (word in words){
        delete words[word]
        var data = JSON.stringify(words, null, 2)
        fs.writeFile('FakeData.json',data, function success(err){
            response.send("word has been deleted")
        })
    }
    
    else{
        response.send("Word you are deleting does not exist")
    }
})
