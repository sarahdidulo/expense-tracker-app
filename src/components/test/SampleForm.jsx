import {useState} from 'react';

export default function SampleForm () {
const [name, setName] = useState("");
    return (
        <div>
            <form onSubmit={getFormData}>
                Name: <input type="text" 
                value={name} 
                onChange={(e)=>setName(e.target.value)} 
                placeholder="Enter your name" />
                <br/>
                <select onChange={(e)=>set}>
                    <option value="">Select Option</option>
                    <option value="React">React</option>
                    <option value="HTML">HTML</option>
                    <option value="CSS">CSS</option>
                </select>
                <br />
                <button>Submit</button>
            </form>
        </div>

    );
}