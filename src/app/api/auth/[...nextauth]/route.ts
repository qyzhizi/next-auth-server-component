import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'

const handler = NextAuth({
    debug: true,
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID || '',
            clientSecret: process.env.GITHUB_SECRET || '',
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID || '',
            clientSecret: process.env.GOOGLE_SECRET || '',
        }),
    ],
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            console.log(user); // 包含用户基本信息
            console.log(account); // 包含 OAuth 提供者的认证信息
            console.log(profile); // OAuth 提供者返回的用户资料
            console.log(email); // 如果使用邮件登录，包含邮箱信息
            console.log(credentials); // 如果使用凭证登录，包含用户提交的凭证
            return true; // 如果返回 `false`，则登录会被拒绝
          },
        async jwt({ token, user, account }) {
            // account 第一次 github 登录时会存在，之后触发这个 jwt 函数，account 会为空
            if (account) {
                console.log("account is true")
                token.accessToken = account.access_token; // 保存 access_token
            }
            console.log("JWT Callback:", { token, user, account });
            return token;
        },
        async session({ session, token }) {
            console.log("Session Callback before:", { session });
            session.accessToken = token.accessToken; // 将 access_token 添加到 session
            console.log("Session Callback added accessToken:", { session, token });
            return session;
          },
          
    },
    secret: process.env.NEXTAUTH_SECRET, //  <---  这里添加 secret
})

export { handler as GET, handler as POST }