CREATE TABLE locations(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    type VARCHAR(20) NOT NULL,

    CONSTRAINT locations_type_check
        CHECK (type IN ('BRANCH', 'WORKSHOP'))
);


CREATE TABLE accounts(
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL,
    location_id INT references locations(id),
    active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT accounts_role_check
        CHECK (role IN ('BRANCH', 'WORKSHOP', 'ADMIN'))
);


CREATE TABLE branch_members (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    active BOOLEAN NOT NULL DEFAULT TRUE
);


CREATE TABLE tickets (
    id SERIAL PRIMARY KEY,

    ticket_number VARCHAR(50) NOT NULL UNIQUE,

    customer_name VARCHAR(150) NOT NULL,
    customer_phone VARCHAR(50),
    customer_email VARCHAR(150),

    product_name VARCHAR(150) NOT NULL,
    issue_description TEXT NOT NULL,
    budget NUMERIC(10,2) NOT NULL,

    repair_status VARCHAR(30) NOT NULL DEFAULT 'PENDING',
    repair_comment TEXT,

    status VARCHAR(30) NOT NULL DEFAULT 'SENT_TO_WORKSHOP',

    branch_id INTEGER NOT NULL
        REFERENCES locations(id),

    created_by_member_id INTEGER NOT NULL
        REFERENCES branch_members(id),

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT tickets_contact_check
        CHECK (
            customer_phone IS NOT NULL
            OR customer_email IS NOT NULL
        ),

    CONSTRAINT tickets_repair_status_check
        CHECK (
            repair_status IN (
                'PENDING',
                'IN_REPAIR',
                'REPAIRED',
                'NOT_REPAIRABLE'
            )
        ),

    CONSTRAINT tickets_status_check
        CHECK (
            status IN (
                'SENT_TO_WORKSHOP',
                'IN_WORKSHOP',
                'RETURNING_TO_BRANCH',
                'RECEIVED_AT_BRANCH',
                'READY_FOR_PICKUP',
                'DELIVERED'
            )
        )
);


CREATE TABLE ticket_events (
    id SERIAL PRIMARY KEY,

    ticket_id INTEGER NOT NULL
        REFERENCES tickets(id),

    event_type VARCHAR(40) NOT NULL,

    from_status VARCHAR(30),
    to_status VARCHAR(30),

    performed_by_account_id INTEGER NOT NULL
        REFERENCES accounts(id),

    member_id INTEGER
        REFERENCES branch_members(id),

    comment TEXT,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);



