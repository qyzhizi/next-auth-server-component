'use client'

import {signIn} from 'next-auth/react'

const SignInButton = () => {
    return (
        <button type="button" onClick={() => signIn()}
                className="rounded-md  px-3.5 py-2.5 text-sm font-semibold shadow-sm ring-2 ring-inset ring-gray-300  hover:bg-blue-300">
            Sign in
        </button>
    )
}

export default SignInButton