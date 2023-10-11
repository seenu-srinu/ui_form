import React, { useEffect, useState } from "react";
import { HOST } from "./config";
import { Container, Row,Col } from "react-bootstrap";
const TicketDetails=()=>{
    const[ticketDetails,setTicketDetails]=useState([
    {
        "id": 3,
        "component_attribute_jsonschema_data": {
            "id": 1,
            "name": "Minneapolis_Component_Attribute_Configuration",
            "jsonschema": {
                "type": "object",
                "properties": {
                    "field1": {
                        "name": " [A] VUI",
                        "type": "string",
                        "display": true
                    },
                    "field2": {
                        "name": "test date field 2",
                        "type": "string",
                        "format": "date",
                        "display": true
                    },
                    "field3": {
                        "name": "test multiselect",
                        "type": "array",
                        "items": {
                            "enum": [
                                "val1",
                                "val2",
                                "val3"
                            ],
                            "type": "string"
                        },
                        "display": true,
                        "uniqueItems": true
                    },
                    "field4": {
                        "name": "test checkbox 2",
                        "type": "boolean",
                        "display": true
                    },
                    "field5": {
                        "name": " [A] Weight Class (balancing weight)",
                        "type": "string",
                        "display": true
                    },
                    "field6": {
                        "name": "test datetime field",
                        "type": "string",
                        "format": "date-time",
                        "display": false
                    },
                    "field7": {
                        "enum": [
                            "val1",
                            "val2"
                        ],
                        "name": "test list field",
                        "type": "string",
                        "display": false
                    },
                    "field8": {
                        "name": " [A] Frequency",
                        "type": "string",
                        "display": true
                    },
                    "field9": {
                        "name": "Test field ",
                        "type": "string",
                        "display": true
                    }
                }
            }
        },
        "ticket_attribute_jsonschema_data": {
            "id": 2,
            "name": "Minneapolis_Ticket_Attribute_Configuration",
            "jsonschema": {
                "type": "object",
                "properties": {
                    "field1": {
                        "name": "Demo Name",
                        "type": "array",
                        "items": {
                            "enum": [
                                "Demo 1",
                                "Demo 2"
                            ],
                            "type": "string"
                        },
                        "display": true,
                        "uniqueItems": true
                    },
                    "field2": {
                        "name": "Issue Reported On",
                        "type": "string",
                        "format": "date",
                        "display": true
                    },
                    "field3": {
                        "name": "Expired [T/F]",
                        "type": "boolean",
                        "display": true
                    },
                    "field4": {
                        "name": "Demo Text Field",
                        "type": "string",
                        "display": true
                    },
                    "field5": {
                        "enum": [
                            "Demo 1",
                            "Demo 2"
                        ],
                        "name": "Demo List",
                        "type": "string",
                        "display": true
                    },
                    "field6": {
                        "name": "test abc",
                        "type": "boolean",
                        "display": true
                    },
                    "field7": {
                        
                        "name": "Demo Text Field 2",
                        "type": "string",
                        "display": true
                        
                    }
                }
            }
        },
        "asset": 8,
        "component_attribute_jsonschema": 1,
        "ticket_attribute_jsonschema": 2
    }
])
    useEffect(()=>{
        fetchTicketReq()
    },[])
    const fetchTicketReq=async ()=>{
        try{
let fetchProm=await fetch(HOST+"/maintenance/api/device_components_configuration/?asset=8",{
    headers:{
    "Content-Type":"application/json",
    "Authorization":"token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMzLCJ1c2VybmFtZSI6InBjaGFrYWxpLml0cEBzcGFya2NvZ25pdGlvbi5jb20iLCJleHAiOjE2OTc1OTg1ODEsImFwaV90b2tlbiI6ZmFsc2V9.16z8iPav9H6D5F9bU31V_F2FanfLmahOP6PZc7wTDQo"
    }
})
let fetchedRes=await fetchProm.json()
console.log("Response:",fetchedRes)
console.log("fethed Res" ,fetchedRes)
console.log("res",fetchedRes[0].ticket_attribute_jsonschema_data.jsonschema.properties.field1.name

)
setTicketDetails(fetchedRes)
        }catch(error){
            console.log(error)
        }
    }
    return(
            <>
{
 ticketDetails.map((item)=>{
    return(
        < >

        <Container >
        <Row>
                <Col style={{display:"flex", justifyContent:"center"}}>  <h1>Ticke Details</h1></Col>
                </Row>
            
                <>
           { Object.keys(item.ticket_attribute_jsonschema_data.jsonschema.properties).map((key) => {
                let i = item.ticket_attribute_jsonschema_data.jsonschema.properties[key]
                return <Row>
                        <Col md={6} sm={6}>{i.name}</Col>
                        <Col md={6} sm={6}>
                            <>
                            {
                                i.type === "array" ?
                                <select>{i.items.enum.map((o)=><option>{o}</option>)}</select>
                                :
                                null
                            }
                            {
                                i.type === "string" && i.format === "date" ?
                                <input type="date" />
                                :
                                i.type === "string" ? <input type="text" /> : null
                            }
                            {
                                i.type === "boolean" ?
                                <input type="checkbox" />
                                :
                                null
                            }
                            
                            </>
                            
                        </Col>
                    </Row>
            })} 
            </>
     </Container>
     </>
     
    )

 })
}
            </>
    )
}
export default TicketDetails;