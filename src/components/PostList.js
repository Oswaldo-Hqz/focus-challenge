import React, { Component } from 'react';
import { innerJoin } from 'json-function';
import axios from 'axios';

export default class post extends Component {

    state = {
        post: []
    }

    async componentDidMount() {
        try {
            // var postlist = {};

            //Obtener json de post
            const resPost = await axios.get('https://jsonplaceholder.typicode.com/posts');
            //Obtener json de users
            const resUsers = await axios.get('https://jsonplaceholder.typicode.com/users');

            var urlBuilder = '';
            var titleRegex = /^(\w{2,})\.\s/g; //Regex para quitar cortesia de nombre

            //construimos la url para obtener genero
            resUsers.data.map(user => user.name.replace(titleRegex, '').split(' ').slice(0, 1).join(' ').trim()).forEach(name => {
                urlBuilder = urlBuilder + '&name[]=' + name;
            });
            const genderize = await axios.get('https://api.genderize.io/?' + urlBuilder.slice(1));

            //Agregamos genero a cada usuario respectivamente
            resUsers.data.forEach(function addGender(currentValue, index, array) {
                currentValue["gender"] = genderize.data[index].gender
            });

            const postlist = innerJoin(resPost.data, resUsers.data, "userId", "id");

            this.setState({
                post: postlist
            })

        } catch (error) {
            console.log(error);            
        }
    };

    render() {
        return (
            <div>
                <div className="row">
                    {
                        this.state.post.map(post => (
                            <div className="col s12 m6 l4 xl4 " >
                                <div className="card large">
                                    <div className="card-image">
                                        {post.gender === 'female' ? (
                                        <img className="responsive-img" src="https://joeschmoe.io/api/v1/josephine" alt={post.username} />
                                        ) : (
                                            <img src="https://joeschmoe.io/api/v1/jacques" alt={post.username} />
                                        ) }
                                    </div>
                                    <div className="card-content">
                                        <span className="card-title">{post.name}</span>
                                        <p>{post.body}</p>
                                    </div>
                                </div>
                            </div>
                        ) )
                    }
                </div>
            </div>
        )
    }
}
