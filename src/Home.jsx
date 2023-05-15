import React, { useState } from 'react';
function Home() {



    const [text, setText] = useState('');
    const [summary, setSummary] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    function textAreaState(event){
        setText(event.target.value);
    }



    async function getData(){
        const ApiKey = '8ebcefba2fmsh38a017c7fcdbe5bp1ce5a3jsn69918e0be5d3'

        //enables the laoding state while retrieving summary
        setLoading(true);

        //refreshes the current state of the state variables
        setError(false);
        setSummary('');

        const url = 'https://tldrthis.p.rapidapi.com/v1/model/abstractive/summarize-text/';

        const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': ApiKey,
            'X-RapidAPI-Host': 'tldrthis.p.rapidapi.com'
        },

        body: JSON.stringify({
            text: text,
            min_length: 100,
            max_length: 300,
            is_detailed: false
        }),
};

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);
        setSummary(result.summary);

        
    } catch (error) {
        setError(true);
        console.log(error);
    } finally {
        setLoading(false);
    }


    }

    return(
       <div className="mx-auto w-full max-w-lg py-24 space-y-24 min-h-screen flex flex-col justify-center">

        <div className="space-y-6 w-full text-center">
          <h1 className="text-4xl font-bold">Text summarization with AI</h1>
        </div>

        <div className="space-y-4 w-full">
          <div className="p-4 border rounded flex flex-col space-y-4 bg-gray-50">
            <textarea
              className="border rounded p-4"
              value={text}
              onChange={textAreaState}
              disabled={loading}
            />
              <button
                type='submit'
                onClick={getData}
                className="bg-black text-white rounded px-4 py-2"
              >
                summarize
              </button>
          </div>
        </div>

        <div className="border space-y-2 rounded bg-white overflow-hidden">
          <div className="p-2">{summary}</div>
        </div>

    </div>
    )
}

export default Home;