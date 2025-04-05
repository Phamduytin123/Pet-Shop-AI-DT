create table accounts
(
    id           bigint auto_increment
        primary key,
    created_at   datetime(6)                          not null,
    deleted_at   datetime(6)                          null,
    updated_at   datetime(6)                          null,
    address      varchar(255)                         null,
    avatar_url   varchar(255)                         null,
    birth_date   date                                 null,
    email        varchar(255)                         not null,
    full_name    varchar(255)                         null,
    gender       bit                                  not null,
    is_active    bit                                  not null,
    password     varchar(255)                         not null,
    phone_number varchar(255)                         null,
    role         enum ('ADMIN', 'CUSTOMER', 'SELLER') not null,
    constraint UKn7ihswpy07ci568w34q0oi8he
        unique (email)
);

create table items
(
    id         bigint auto_increment
        primary key,
    created_at datetime(6) not null,
    deleted_at datetime(6) null,
    updated_at datetime(6) null,
    price      int         null,
    quantity   int         null
);

create table orders
(
    id           bigint auto_increment
        primary key,
    created_at   datetime(6)                                                                                 not null,
    deleted_at   datetime(6)                                                                                 null,
    updated_at   datetime(6)                                                                                 null,
    address      varchar(255)                                                                                null,
    phone_number varchar(255)                                                                                null,
    status       enum ('CANCELLED', 'COMPLETED', 'CONFIRMED', 'DELIVERING', 'PENDING', 'PREPARING', 'READY') not null,
    total_price  int                                                                                         null,
    account_id   bigint                                                                                      null,
    constraint FKagh5svlor3slbay6tq5wqor1o
        foreign key (account_id) references accounts (id)
);

create table order_details
(
    id         bigint auto_increment
        primary key,
    created_at datetime(6) not null,
    deleted_at datetime(6) null,
    updated_at datetime(6) null,
    quantity   int         null,
    item_id    bigint      null,
    order_id   bigint      null,
    constraint FKjyu2qbqt8gnvno9oe9j2s2ldk
        foreign key (order_id) references orders (id),
    constraint FKnfrrgu0scdkwpptvs5gx6m6o9
        foreign key (item_id) references items (id)
);

create table pet_details
(
    age          int          null,
    color        varchar(255) null,
    date_time    date         null,
    gender       bit          not null,
    heath_status varchar(255) null,
    id           bigint       not null
        primary key,
    pet_id       bigint       null,
    constraint FKr6cp4dc866ebvc43g29sjqio1
        foreign key (id) references items (id)
);

create table pet_images
(
    id         bigint auto_increment
        primary key,
    created_at datetime(6)  not null,
    deleted_at datetime(6)  null,
    updated_at datetime(6)  null,
    url        varchar(255) null,
    pet_id     bigint       null,
    constraint FKc6fl1qwxt1nx6nvevk9fg4e9x
        foreign key (pet_id) references pet_details (id)
);

create table pet_products
(
    description varchar(255)         null,
    image       varchar(255)         null,
    name        varchar(255)         null,
    type        enum ('Food', 'Toy') not null,
    id          bigint               not null
        primary key,
    constraint FKpcbmy8cfppa8ydtk0qn6h97wq
        foreign key (id) references items (id)
);

create table pets
(
    id          bigint auto_increment
        primary key,
    name        varchar(255)                        not null,
    style       varchar(255)                        null,
    breed       varchar(255)                        null,
    image       varchar(255)                        null,
    difficulty  int                                 null,
    behavior    varchar(255)                        null,
    ferocious   int                                 null,
    space       int                                 null,
    `group`     int                                 null,
    description text                                null,
    created_at  timestamp default CURRENT_TIMESTAMP null,
    updated_at  timestamp default CURRENT_TIMESTAMP null on update CURRENT_TIMESTAMP
);

create table shopping_carts
(
    id         bigint auto_increment
        primary key,
    created_at datetime(6) not null,
    deleted_at datetime(6) null,
    updated_at datetime(6) null,
    quantity   int         null,
    account_id bigint      null,
    item_id    bigint      null,
    constraint FK4y1iwh0biipbwd08h1ucc80b0
        foreign key (item_id) references items (id),
    constraint FKptd2doapk2dl8fpi5l4cd0tpd
        foreign key (account_id) references accounts (id)
);


