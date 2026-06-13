"use client"

import { useActionState } from "react"

import { registerUser } from "../actions/users"

export default function RegisterPage() {

  const [state, formAction] = useActionState(registerUser, {errors: {}, values: { username: '', name: ''}})

  return (
    <div>
      <h2>Register</h2>
      <form action={formAction}>
        <div>
          <label>
            Username
            <input type="text" name="username" required defaultValue={state.values?.username}/>
            {"username" in state.errors && <p style={{ color: "red" }}>{state.errors.username}</p>}
          </label>
        </div>
        <div>
          <label>
            Name
            <input type="text" name="name" required defaultValue={state.values?.name}/>
          </label>
        </div>
        <div>
          <label>
            Password
            <input type="password" name="password" required/>
            {"password" in state.errors && <p style={{ color: "red" }}>{state.errors.password}</p>}
          </label>
        </div>
        <div>
          <label>
            Confirm Password
            <input type="password" name="confirmPassword" required />
            {"confirm" in state.errors && <p style={{ color: "red" }}>{state.errors.confirm}</p>}
          </label>
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  )
}