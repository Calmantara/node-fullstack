-- Active: 1706066866897@@127.0.0.1@15432@academic@public
create DATABASE academic;

-- constraint
-- primary KEY
-- INDEX
-- foreign key
-- . . .

-- buat table

create Table mahasiswa (
    id SERIAL PRIMARY key, nama VARCHAR(255) NOT null, dob DATE, adress text, jurusan_id INT, created_at TIMESTAMP default now(), updated_at TIMESTAMP default now(), deleted_at TIMESTAMP
)

create Table dosen (
    id SERIAL PRIMARY key, nama VARCHAR(255) NOT null, dob DATE, adress text, jurusan_id INT, created_at TIMESTAMP default now(), updated_at TIMESTAMP default now(), deleted_at TIMESTAMP
)

create table mata_kuliah (
    id serial primary key, nama varchar(100) not null, jumlah_sks INT not null, status varchar(10), created_at TIMESTAMP default now(), updated_at TIMESTAMP default now(), deleted_at TIMESTAMP
)

create table r_mahasiswa_mata_kuliah (
    id serial PRIMARY key, mahasiswa_id int, mata_kuliah_id int, created_at TIMESTAMP default now(), updated_at TIMESTAMP default now(), deleted_at TIMESTAMP
)

create table r_dosen_mata_kuliah (
    id serial PRIMARY key, mahasiswa_id int, mata_kuliah_id int, created_at TIMESTAMP default now(), updated_at TIMESTAMP default now(), deleted_at TIMESTAMP
)

alter table r_dosen_mata_kuliah drop column mahasiswa_id;

alter table r_dosen_mata_kuliah add column dosen_id int;

create table jurusan (
    id serial PRIMARY key, nama varchar(100), created_at TIMESTAMP default now(), updated_at TIMESTAMP default now(), deleted_at TIMESTAMP
)
-- membuat relasi

alter table mahasiswa
add constraint fk_mahasiswa_jurusan Foreign Key (jurusan_id) REFERENCES jurusan (id);

alter table dosen
add constraint fk_dosen_jurusan Foreign Key (jurusan_id) REFERENCES jurusan (id);

alter table r_mahasiswa_mata_kuliah
add constraint fk_mahasiswa_mk_mhid Foreign Key (mahasiswa_id) REFERENCES mahasiswa (id);

alter table r_mahasiswa_mata_kuliah
add constraint fk_mahasiswa_mk_mkid Foreign Key (mata_kuliah_id) REFERENCES mata_kuliah (id);

alter table r_dosen_mata_kuliah
add constraint fk_dosen_mk_dsid Foreign Key (dosen_id) REFERENCES dosen (id);

alter table r_dosen_mata_kuliah
add constraint fk_dosen_mk_mkid Foreign Key (mata_kuliah_id) REFERENCES mata_kuliah (id);