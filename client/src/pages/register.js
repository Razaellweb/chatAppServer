import React, { useState } from "react";

const Register = () => {
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [conirm, setConirm] = useState("block")
    const [load, setLoad] = useState("loadr")
    const [loa, setLoa] = useState("loadr")


    async function registerUser(event) {
        event.preventDefault();
        setConirm("none")
        setLoad("loaderx")
        setLoa("loadex")
        const response = await fetch("https://connectrz.herokuapp.com/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                name,
                password,
                profile: "true"
            })
        })
        const data = await response.json();
        console.log(data)
        if (data.done) {
            window.location = "/login"
        }
        else {
            setConirm("block")
            setLoad("loax")
            setLoa("loadx")
            window.location = "/register"
        }
    }

    return (
        <div className="container">
            <center>
                <h1 className="header">Sign up</h1>
            </center>
            <div className="img1"></div>
            <center>
                <div>
                    <form onSubmit={registerUser}>
                        <input type={"text"} className="input" placeholder="email" onChange={(e) => { setEmail(e.target.value) }} /><br /><br />
                        <input type={"text"} className="input" placeholder="Username" onChange={(e) => { setName(e.target.value) }} /><br /><br />
                        <input type={"password"} className="input" placeholder="Password" onChange={(e) => { setPassword(e.target.value) }} /><br /><br />
                        <button type="submit" className='btn'><span style={{ display: conirm }}>Register</span>
                            <center>
                                <div className={load}>
                                    <div className={loa}>

                                    </div>

                                </div>
                            </center>
                        </button>
                    </form>
                </div>
                <p className="para">For the best experience, use your work or school email</p>
            </center>
        </div>
    )
}

export default Register;