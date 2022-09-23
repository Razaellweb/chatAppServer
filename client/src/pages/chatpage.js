import React, { useEffect, useState } from "react"

const ChatPage = () => {
    const [message, setMessage] = useState("")
    const [allMessages, setAllMessages] = useState([])
    const chatid1 = localStorage.getItem("spaceid1");
    const chatid2 = localStorage.getItem("spaceid2");
    const name = localStorage.getItem("nameSpace")
    const [conirm, setConirm] = useState("block")
    const [load, setLoad] = useState("loadr")
    const [loa, setLoa] = useState("loadr")
    const receiversName = localStorage.getItem("receiversName")
    const [num, setNum] = useState(0)

    useEffect(() => {
        getMessage()
    }, [])

    useEffect(() => {
        getMessage()
    })


    async function getMessage() {
        const response = await fetch("https://connectrz.herokuapp.com/api/getMessages", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                chatid1,
                chatid2,
                name
            })
        })
        const data = await response.json();
        console.log(data)
        if (data.messages) {
            for (let i = 0; i < data.messages.length; i++) {
                if (data.messages[i].sender == name) {
                    data.messages[i].class = "sender"
                    setAllMessages(data.messages)
                    setNum(Math.random())
                }
                else {
                    setAllMessages(data.messages)
                }
            }
        }
        else {
            setAllMessages([])
        }
        setNum(Math.random())
    }

    async function sendMessage(event) {
        event.preventDefault();
        setConirm("none")
        setLoad("loaderx")
        setLoa("loadex")
        const response = await fetch("https://connectrz.herokuapp.com/api/sendMessage", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                chatid1,
                message,
                name
            })
        })
        const data = await response.json();
        console.log(data)
        if (data.sent) {
            getMessage()
            setConirm("block")
            setLoad("loarx")
            setLoa("loade")
            setMessage("")
        }
        else {
            console.log("check for erors")
        }
    }
    return (
        <div className="container">
            <h4>{receiversName}</h4>
            {allMessages.map((item) => {
                return (
                    <div key={Math.random()}>
                        <fieldset className={item.class}>
                            <p>{item.sender}</p>
                            <div className="line"></div>
                            <h5>{item.message}</h5>
                        </fieldset><br />
                    </div>
                )
            })}
            <form onSubmit={sendMessage}>
                <input type="text" value={message} className="input" onChange={(e) => { setMessage(e.target.value) }} />

                <button type="submit" className='btn'><span style={{ display: conirm }}>send</span>
                    <center>
                        <div className={load}>
                            <div className={loa}>

                            </div>

                        </div>
                    </center>
                </button>
            </form>
        </div>
    )
}

export default ChatPage;