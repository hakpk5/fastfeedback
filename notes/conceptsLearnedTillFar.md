# JAM STACK

> JavaScript APIs Markup, meaning, using existing technology to build something new.
> APIs does majority of our backend functionality, and markups like HTML, md, and templating language for static site generation(can also use static site generator)

`So, making sites using established technologies.`

> Speed: The whole idea of speed boils down to static site generation, so we don't have any server logic here to calculate/compute for the site to be served, we just host the HTML code over a CDN, and serve the site to the clients on the fly.

> Secure: Abstracted from maintainig server, and needless to do server logic, and issuing regular patches to bugs and maintainig infrastructure are again abstracted.

> Scalibility: The idea of scalibility is, you don't have any server logic which will process the request and then generate and respond with some html file, it just takes a request and responds with site data without computing anything. So it can scale a lot.

> Better Developer Experience after all.

## So, what's the Gist?

> In a dynamic site, in case if you're visiting a blog post, then the site server has to find that post inside the database, and then generate a code for it to send it back to the source, but in a static site, you already have static set of assets hosted over a CDN, and you just get back that prebuilt stuff upon request. This increases the speed blazing fast.

#### There's a service to everything which can be intergrated to build something new, so leveraging third party services is usually encouraged, when services doesn't exist, build one with serverless concept.

## Site hosting and other services.

> Hosting: Vercel, netlify, aws, azure, firebase etc.

> Payments: Stripe, Paypal, Shopify.

> Data storage: airtable, mongodb.

> Media and asset management: cloudnary

> For authentication: firebase, auth0

<!-- # Align yourself with a pattern of your learnings, the life will automatically set you to fit that line of pattern of success.  -->

## When not to use JAMSTACK?

> Performant requirements of computing logics within milliseconds, and delivering based on evaluated logic, A Jamstack application might not be the best choice to work on.

# **Pages in NextJS**

> a page is a React Component exported from a .js, .jsx, .ts, or .tsx file in the pages directory

Example: If you create pages/about.js that exports a React component like below, it will be accessible at /about.

```
function About() {
  return <div>About</div>
}

export default About
```

---

### **Two forms of pre-rendering**

1. Static site generation: HTML is generated on build time, and this is served on each request.

2. Server Side rendering: The HTML is generated on each request.

**Static Generation with data**

1. Your page content depends on external data: Use getStaticProps.
2. Your page paths depend on external data: Use getStaticPaths (usually in addition to getStaticProps).

---

**Scenario 1: Your page content depends on external data**

_Example: Your blog page might need to fetch the list of blog posts from a CMS (content management system)._

```
// TODO: Need to fetch `posts` (by calling some API endpoint)
//       before this page can be pre-rendered.
function Blog({ posts }) {
  return (
    <ul>
      {posts.map((post) => (
        <li>{post.title}</li>
      ))}
    </ul>
  )
}

export default Blog
```

> _an async function called 'getStaticProps' is called at build time, and passes fetched data to the page's props on build time._

```
function Blog({ posts }) {
  // Render posts...
}

// This function gets called at build time on server side.
export async function getStaticProps() {
  // Call an external API endpoint to get posts
  const res = await fetch('https://.../posts')
  const posts = await res.json()

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      posts,
    },
  }
}

export default Blog
```

**Scenario 2: Your page paths depend on external data**

> _Next.js allows you to create pages with dynamic routes.
> Suppose you got two blog posts, with id starting from 1, and now the page path depends on external data ([id] in this case), nextjs has an async function getStaticPaths that lets one pre-render pages with dynamic routes(pages/posts/[id].js in this case)._

## Example:

```
// This function gets called at build time
export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const res = await fetch('https://.../posts')
  const posts = await res.json()

  // Get the paths we want to pre-render based on posts
  const paths = posts.map((post) => ({
    params: { id: post.id },
  }))

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false }
}
```

**Also in pages/posts/[id].js, you need to export getStaticProps so that you can fetch the data about the post with this id and use it to pre-render the page:**

```
function Post({ post }) {
  // Render post...
}

export async function getStaticPaths() {
  // ...
}

// This also gets called at build time
export async function getStaticProps({ params }) {
  // params contains the post `id`.
  // If the route is like /posts/1, then params.id is 1
  const res = await fetch(`https://.../posts/${params.id}`)
  const post = await res.json()

  // Pass post data to the page via props
  return { props: { post } }
}

export default Post

```

## **Server Side Rendering or Dynamic Rendering**

`If a page uses Server-side Rendering, the page HTML is generated on each request. To use Server-side Rendering for a page, you need to export an async function called getServerSideProps. This function will be called by the server on every request.`

```
function Page({ data }) {
  // Render data...
}

// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`https://.../data`)
  const data = await res.json()

  // Pass data to the page via props
  return { props: { data } }
}

export default Page

```
