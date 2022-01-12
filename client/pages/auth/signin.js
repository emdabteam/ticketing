import { useState } from "react";
import Router from 'next/router';
import useRequest from "../../hooks/use-request";


export default () => { 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [errors, setErrors] = useState([]);
  const { doRequest, errors } = useRequest({
    url: '/api/users/signin',
    method: 'post',
    body: {
      email, password
    },
    onSuccess: () => Router.push('/')
  });

  const onSubmit = async event => {
    event.preventDefault();

    // Router.push('/');
    await doRequest();
    // Router.push('/');
    // try {
    //   const response = await axios.post('/api/users/signup', {
    //     email, password
    //   });

    //   console.log(response.data);

    // } catch (err) {
    //   // console.log(err.response.data);
    //   setErrors(err.response.data.errors);
    // }
  };

  return ( 
    <form onSubmit={onSubmit}>
      <h1>Sign In</h1>
      <div className="form-group">
        <label>Email address</label>
        <input value={email} onChange={e => setEmail(e.target.value)} className="form-control"></input>
      </div>
      <div className="form-group">
        <label>Password</label>
        <input value={password} onChange={e => setPassword(e.target.value)} type="password" className="form-control"></input>
      </div>
      {errors /* {errors.length > 0 && } */}
      <button className="btn btn-primary">Sign In</button>
    </form>
  )
};