import { useState } from 'react'
import reactLogo from './assets/4.jpg'
import './App.css'

function App() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars,no-empty-pattern
    const [] = useState(0)

    return (
        <>
            <div>
                <a>
                    <img src={reactLogo} className="MyPhoto" alt="React logo"/>
                </a>
            </div>
            <h1 className="Group">CR-221</h1>
            <p className="Name">Andriuta Dragos
            </p>
        </>
    )
}

export default App
