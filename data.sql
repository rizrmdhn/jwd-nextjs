--
-- PostgreSQL database dump
--

-- Dumped from database version 15.3
-- Dumped by pg_dump version 15.3

-- Started on 2025-05-26 09:39:08

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 6 (class 2615 OID 35615)
-- Name: drizzle; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA drizzle;


ALTER SCHEMA drizzle OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 216 (class 1259 OID 35617)
-- Name: __drizzle_migrations; Type: TABLE; Schema: drizzle; Owner: postgres
--

CREATE TABLE drizzle.__drizzle_migrations (
    id integer NOT NULL,
    hash text NOT NULL,
    created_at bigint
);


ALTER TABLE drizzle.__drizzle_migrations OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 35616)
-- Name: __drizzle_migrations_id_seq; Type: SEQUENCE; Schema: drizzle; Owner: postgres
--

CREATE SEQUENCE drizzle.__drizzle_migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE drizzle.__drizzle_migrations_id_seq OWNER TO postgres;

--
-- TOC entry 3356 (class 0 OID 0)
-- Dependencies: 215
-- Name: __drizzle_migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: drizzle; Owner: postgres
--

ALTER SEQUENCE drizzle.__drizzle_migrations_id_seq OWNED BY drizzle.__drizzle_migrations.id;


--
-- TOC entry 217 (class 1259 OID 35625)
-- Name: jwd-nextjs_products; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."jwd-nextjs_products" (
    id uuid NOT NULL,
    kategori character varying(256) NOT NULL,
    produk character varying(256) NOT NULL,
    price numeric NOT NULL,
    description text NOT NULL,
    foto text,
    "fotoUrl" text,
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp with time zone
);


ALTER TABLE public."jwd-nextjs_products" OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 35633)
-- Name: jwd-nextjs_sessions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."jwd-nextjs_sessions" (
    id uuid NOT NULL,
    "userId" uuid NOT NULL,
    expires_at timestamp with time zone NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public."jwd-nextjs_sessions" OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 35639)
-- Name: jwd-nextjs_users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."jwd-nextjs_users" (
    id uuid NOT NULL,
    name character varying(256) NOT NULL,
    username character varying(256) NOT NULL,
    password character varying(256) NOT NULL,
    foto text,
    "fotoUrl" text,
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp with time zone
);


ALTER TABLE public."jwd-nextjs_users" OWNER TO postgres;

--
-- TOC entry 3186 (class 2604 OID 35620)
-- Name: __drizzle_migrations id; Type: DEFAULT; Schema: drizzle; Owner: postgres
--

ALTER TABLE ONLY drizzle.__drizzle_migrations ALTER COLUMN id SET DEFAULT nextval('drizzle.__drizzle_migrations_id_seq'::regclass);


--
-- TOC entry 3347 (class 0 OID 35617)
-- Dependencies: 216
-- Data for Name: __drizzle_migrations; Type: TABLE DATA; Schema: drizzle; Owner: postgres
--

COPY drizzle.__drizzle_migrations (id, hash, created_at) FROM stdin;
1	9038c9d10599c1bc7e5117595a088d19998679f08f5443e237a2ec62229f12eb	1748143453936
\.


--
-- TOC entry 3348 (class 0 OID 35625)
-- Dependencies: 217
-- Data for Name: jwd-nextjs_products; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."jwd-nextjs_products" (id, kategori, produk, price, description, foto, "fotoUrl", "createdAt", "updatedAt") FROM stdin;
019706bd-7ed1-74af-8d69-297a64d3e5d9	asdasdsa	asdasda	250000	asdasdasd	product-019706bd-7eb5-758e-9742-8236e33f4cee.png	/api/uploads/products/product-019706bd-7eb5-758e-9742-8236e33f4cee.png	2025-05-25 17:19:31.517355+08	2025-05-25 17:19:31.538+08
019706bd-c2aa-778c-9496-b8cb53878a74	yeeet	asdasd	350000	asdasddas	product-019706bd-c2a3-724d-a6c8-20b80f5e5714.png	/api/uploads/products/product-019706bd-c2a3-724d-a6c8-20b80f5e5714.png	2025-05-25 17:19:48.899883+08	2025-05-25 17:19:48.906+08
\.


--
-- TOC entry 3349 (class 0 OID 35633)
-- Dependencies: 218
-- Data for Name: jwd-nextjs_sessions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."jwd-nextjs_sessions" (id, "userId", expires_at, "createdAt") FROM stdin;
019706bd-3043-7570-bd42-a9984ad2ff89	019706ae-57e2-71a3-bb46-16995f607f83	2025-06-24 17:19:11.428+08	2025-05-25 17:19:11.428+08
\.


--
-- TOC entry 3350 (class 0 OID 35639)
-- Dependencies: 219
-- Data for Name: jwd-nextjs_users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."jwd-nextjs_users" (id, name, username, password, foto, "fotoUrl", "createdAt", "updatedAt") FROM stdin;
019706ae-57e2-71a3-bb46-16995f607f83	Admin	admin	$argon2id$v=19$m=19456,t=2,p=1$38dziJ5EixUXL2YyS7YXcA$pWmC/Be9oZxawqsCvjnAwc9fe6crmi96+TAKyNVrRSA	\N	\N	2025-05-25 17:02:58.540808+08	2025-05-25 17:02:58.53+08
\.


--
-- TOC entry 3357 (class 0 OID 0)
-- Dependencies: 215
-- Name: __drizzle_migrations_id_seq; Type: SEQUENCE SET; Schema: drizzle; Owner: postgres
--

SELECT pg_catalog.setval('drizzle.__drizzle_migrations_id_seq', 1, true);


--
-- TOC entry 3191 (class 2606 OID 35624)
-- Name: __drizzle_migrations __drizzle_migrations_pkey; Type: CONSTRAINT; Schema: drizzle; Owner: postgres
--

ALTER TABLE ONLY drizzle.__drizzle_migrations
    ADD CONSTRAINT __drizzle_migrations_pkey PRIMARY KEY (id);


--
-- TOC entry 3193 (class 2606 OID 35632)
-- Name: jwd-nextjs_products jwd-nextjs_products_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."jwd-nextjs_products"
    ADD CONSTRAINT "jwd-nextjs_products_pkey" PRIMARY KEY (id);


--
-- TOC entry 3196 (class 2606 OID 35638)
-- Name: jwd-nextjs_sessions jwd-nextjs_sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."jwd-nextjs_sessions"
    ADD CONSTRAINT "jwd-nextjs_sessions_pkey" PRIMARY KEY (id);


--
-- TOC entry 3200 (class 2606 OID 35646)
-- Name: jwd-nextjs_users jwd-nextjs_users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."jwd-nextjs_users"
    ADD CONSTRAINT "jwd-nextjs_users_pkey" PRIMARY KEY (id);


--
-- TOC entry 3194 (class 1259 OID 35652)
-- Name: products_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX products_id_idx ON public."jwd-nextjs_products" USING btree (id);


--
-- TOC entry 3197 (class 1259 OID 35653)
-- Name: session_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX session_id_idx ON public."jwd-nextjs_sessions" USING btree (id);


--
-- TOC entry 3198 (class 1259 OID 35654)
-- Name: user_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX user_id_idx ON public."jwd-nextjs_sessions" USING btree ("userId");


--
-- TOC entry 3201 (class 1259 OID 35655)
-- Name: users_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX users_id_idx ON public."jwd-nextjs_users" USING btree (id);


--
-- TOC entry 3202 (class 1259 OID 35656)
-- Name: users_username_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX users_username_idx ON public."jwd-nextjs_users" USING btree (username);


--
-- TOC entry 3203 (class 2606 OID 35647)
-- Name: jwd-nextjs_sessions jwd-nextjs_sessions_userId_jwd-nextjs_users_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."jwd-nextjs_sessions"
    ADD CONSTRAINT "jwd-nextjs_sessions_userId_jwd-nextjs_users_id_fk" FOREIGN KEY ("userId") REFERENCES public."jwd-nextjs_users"(id) ON DELETE CASCADE;


-- Completed on 2025-05-26 09:39:09

--
-- PostgreSQL database dump complete
--

