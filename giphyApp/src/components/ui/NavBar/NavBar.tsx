import { FormEvent, useState } from "react";
import { Button, Col, Form, Navbar, Row } from "react-bootstrap"
import { useAppDispatch } from "../../../hooks/redux";
import { setGifs } from "../../../redux/slices/gifSlice";

const API_KEY=import.meta.env.VITE_API_KEY;

export const NavBar = () => {
    const dispatch=useAppDispatch()
    
    const fetchGif=async (query:string)=>{
        try {
            const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${query}&limit=16&offset=0&rating=g&lang=en&bundle=messaging_non_clips`);
            const data=await response.json();
            const parseData=data.data.map((el:any) => ({
                urlGif:el.images.fixed_height.url,
                title:el.title,
            }));
            dispatch(setGifs(parseData));
        } catch (error) {
            console.warn(error)
        }
    }
    const [queryInput, setQueryInput]=useState("");
    const submit=(e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        fetchGif(queryInput);
    }
  return (
    <Navbar className="bg-body-tertiary justify-content-center">
      <Form onSubmit={submit}>
        <Row>
          <Col xs="auto">
            <Form.Control
            onChange={(e) => {
                setQueryInput(e.target.value);
            }}
              type="text"
              placeholder="Search"
              className=" mr-sm-2"
            />
          </Col>
          <Col xs="auto">
            <Button type="submit">Submit</Button>
          </Col>
        </Row>
      </Form>
    </Navbar>
  )
}
