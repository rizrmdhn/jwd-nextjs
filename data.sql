--
-- PostgreSQL database dump
--

-- Dumped from database version 15.3
-- Dumped by pg_dump version 15.3

-- Started on 2025-05-26 11:29:14

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
    "updatedAt" timestamp with time zone,
    stok numeric NOT NULL
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
2	8b1c70658e2461b2e0b38fff778f5d8d92b6f9886d8393dcbe0858c20ea24ef3	1748225392387
\.


--
-- TOC entry 3348 (class 0 OID 35625)
-- Dependencies: 217
-- Data for Name: jwd-nextjs_products; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."jwd-nextjs_products" (id, kategori, produk, price, description, foto, "fotoUrl", "createdAt", "updatedAt", stok) FROM stdin;
27ea31c6-1f43-4c2d-9a40-4ff9e0cfa96d	Budget Samsung	Google Pixel 7	31490	qMUgeJnGoGI69oFCD6	lyUyDNDUJ507Su9d26c	4IB7MzCEwUqXIiusdmS	2023-11-01 20:31:12.266+08	2022-10-02 20:40:56.61+08	45
9dc84677-4a1b-412a-9c6b-7aa325fbf952	Mid-range Samsung	iPhone 12	48685	Xp729b9f	ZqrxdVhJ13o	O7DNUhvBP	2024-08-11 17:13:41.165+08	2023-04-02 08:01:01.815+08	20
d6a58305-654c-4e4e-27a3-04623224d614	Mid-range Gaming	ROG Phone 5	52929	VxFwHMs	b2rs33rzFGagoRDti	gv5SpTh	2023-06-05 17:56:31.021+08	2024-03-29 16:19:39.827+08	25
c593a4ce-44f6-4331-1627-47ffa8b21ea1	Vivo Flagship	Vivo V25	47763	HKbv2Mu1bucP9Zg6qH6O	tfCTDi24H5jO3jeWt	CGY2MfgET58ZhS9Vb	2026-05-07 05:24:09.962+08	2026-02-24 04:18:39.581+08	36
f1b5b24e-8db9-4932-bb10-ea280acbca3a	Oppo Flagship	Vivo V25	74589	pJ4xJSFQ17uLu0h	qtpoQer5f9jQK3Z9	wIf33U6LdQ5i1q	2025-09-07 05:26:01.313+08	2022-12-11 19:10:30.144+08	6
848082e9-3f8b-45bb-09cb-326b1c18acd1	Mid-range iPhone	OnePlus 10	98528	o4YHdBpFfJUakBlL5A	GXMzkAfnG2Cppn0d	wPnt9nr6FL	2024-09-09 07:14:15.227+08	2025-06-27 20:58:40.339+08	15
42ee3fa2-e74a-4692-b5da-3ff20b7c9e5c	Realme Gaming	Realme GT Neo 3	4699	2PnzWdJSvUDhG2D2	3nD0i4wXH	dBNUYczF	2024-11-13 21:37:43.44+08	2023-07-18 11:48:07.571+08	21
b7f23c36-2c54-4703-1d65-b3664121416b	Google Mid-range	Oppo Find X5	71407	Am6Jrw2fkoAeYNKz	O2vTuqCA	D20kLvQhzi	2026-02-24 19:15:01.682+08	2023-09-29 00:38:19.575+08	25
b806134c-eb79-47df-062a-8c4efb9673fa	Google Flagship	Samsung A54	97965	jplNoftFv7PNN	Qk0NlOV	cSemiyAm	2022-10-25 17:00:01.861+08	2025-04-07 01:35:41.406+08	6
98db2730-e4ee-462c-a8a3-74c57aff27da	Budget iPhone	ROG Phone 6	34927	AfvjUFJ0Mq36	BfqbHOMaztcmdsJ	xHNHrY4	2025-10-21 08:43:54.122+08	2025-10-24 01:29:13.455+08	38
5055911a-836a-464e-f842-47d95b05e386	Vivo Mid-range	iPhone 12	21292	deqvinVNPuL	5rcnibU1uAiQuf	xJpnocKKyPD0c2O	2024-05-31 10:29:28.978+08	2024-07-09 19:59:17.641+08	46
ee43df54-e9ab-4cda-282f-6fb82c158f1a	Flagship Samsung	Google Pixel 6	37957	PYRDVAcqQRB	iwjTQIuhS78pjXjXwfb	y8zsm5lTkSn	2023-08-30 04:38:48.262+08	2023-01-11 11:16:10.244+08	8
34cc7351-4235-4915-b80f-35f425836341	Mid-range Samsung	OnePlus 10	67556	LwhDdZ106f	1H66E1KC2MzjgqcUm	rWgpMCW	2022-08-08 02:17:49.117+08	2026-02-16 21:25:51.066+08	10
45531ae2-a051-4a1d-d5f8-32e9ad7c572c	Oppo Mid-range	iPhone 13	41757	ljmUddpvr4NBY	7ztcKsT9wlNw	zw9bnSCHen	2024-04-22 11:51:53.464+08	2025-07-21 21:54:07.19+08	5
20ec3652-4ae5-49ec-a097-1f19eedfe1b0	Oppo Mid-range	Samsung S22	90058	JogXmOwLgJs	1IFTD35Wq1Ux	0Kyip9d5nq1mZwZHX	2023-12-10 16:30:19.762+08	2022-06-26 00:12:18.295+08	9
\.


--
-- TOC entry 3349 (class 0 OID 35633)
-- Dependencies: 218
-- Data for Name: jwd-nextjs_sessions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."jwd-nextjs_sessions" (id, "userId", expires_at, "createdAt") FROM stdin;
01970aa2-112f-773f-9d58-e1dcdb0d5be3	01970aa1-b242-73d6-a461-1d77eec28d24	2025-06-25 11:28:02.864+08	2025-05-26 11:28:02.864+08
\.


--
-- TOC entry 3350 (class 0 OID 35639)
-- Dependencies: 219
-- Data for Name: jwd-nextjs_users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."jwd-nextjs_users" (id, name, username, password, foto, "fotoUrl", "createdAt", "updatedAt") FROM stdin;
01970aa1-b242-73d6-a461-1d77eec28d24	Admin	admin	$argon2id$v=19$m=19456,t=2,p=1$1x5oZUAly5YgCJgX2o/yDA$+vyBT6hZYZcOiR54etjh1bO87HK/FxwaXVrhvcAPTVw	\N	\N	2025-05-26 11:27:38.5677+08	2025-05-26 11:27:38.562+08
\.


--
-- TOC entry 3357 (class 0 OID 0)
-- Dependencies: 215
-- Name: __drizzle_migrations_id_seq; Type: SEQUENCE SET; Schema: drizzle; Owner: postgres
--

SELECT pg_catalog.setval('drizzle.__drizzle_migrations_id_seq', 2, true);


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


-- Completed on 2025-05-26 11:29:15

--
-- PostgreSQL database dump complete
--

