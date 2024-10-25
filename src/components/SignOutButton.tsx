'use client'

import {signOut} from 'next-auth/react'

const SignOutButton = () => {
    return (
        <button type="button" onClick={() => signOut({callbackUrl: '/'})}
                className="rounded-md  px-3.5 py-2.5 text-sm font-semibold shadow-sm ring-2 ring-inset ring-gray-300  hover:bg-blue-300">
            Sign out
        </button>
    )
}

export default SignOutButton