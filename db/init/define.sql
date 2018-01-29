CREATE SEQUENCE parentid_seq START 1;
CREATE SEQUENCE venueid_seq START 1;
CREATE SEQUENCE eventid_seq START 1;

DROP TABLE IF EXISTS "Parent";
CREATE TABLE "public"."Parent" (
    "ParentID" integer DEFAULT nextval('ParentID_seq') NOT NULL,
    "Name" character varying(40) NOT NULL,
    "Email" character varying(40) NOT NULL,
    "Password" character varying(64) NOT NULL,
    "Address" character varying(40) NOT NULL,
    "Phone" character varying(14) NOT NULL,
    "Balance" integer NOT NULL,
    "BonusPoints" integer NOT NULL,
    CONSTRAINT "ParentID" PRIMARY KEY ("ParentID")
) WITH (oids = false);

DROP TABLE IF EXISTS "Venue";
CREATE TABLE "public"."Venue" (
    "VenueID" integer DEFAULT nextval('VenueID_seq') NOT NULL,
    "Name" character varying(30) NOT NULL,
    "IRS_number" character varying(10) NOT NULL,
    "Address" character varying(10) NOT NULL,
    "Email" character varying(30) NOT NULL,
    "Password" character varying(30) NOT NULL,
    "Location" GEOGRAPHY(POINT,4326) NOT NULL,
    CONSTRAINT "VenueID" PRIMARY KEY ("VenueID")
) WITH (oids = false);

DROP TABLE IF EXISTS "Event";
CREATE TABLE "public"."Event" (
    "EventID" integer DEFAULT nextval('eventid_seq') NOT NULL,
    "Name" character varying NOT NULL,
    "Price" integer NOT NULL,
    "Tickets" integer NOT NULL,
    CONSTRAINT "EventID" PRIMARY KEY ("EventID")
) WITH (oids = false);
