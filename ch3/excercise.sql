-- insert jurusan
insert into jurusan (nama) values ('matematika');

insert into jurusan (nama) values ('fisika'), ('biologi');

select *
from jurusan
where
    jurusan.id > 2
    and jurusan.deleted_at is null;

-- alter table
alter table dosen add column alamat text;

-- insert mahasiswa
insert into
    mahasiswa (nama, dob, alamat, jurusan_id)
values (
        'mahasiswa 1', '01-01-2001', 'bsd city', 1
    );

insert into
    mahasiswa (nama, dob, alamat, jurusan_id)
values (
        'mahasiswa 2', '02-02-2001', 'bsd city', 2
    );

insert into
    mahasiswa (nama, dob, alamat, jurusan_id)
values (
        'mahasiswa 3', '03-03-2001', 'bsd city', 3
    ),
    (
        'mahasiswa 4', '04-03-2001', 'bsd city', 1
    );

select * from mahasiswa m;

-- karyawan:
-- query untuk mendapatkan info mahasiswa
-- beserta nama jurusan yang tidak di delete
-- hanya memerlukan
-- mahasiswaId,
-- mahasiswaNama,
-- jurusanNama,
-- tanggalRegistrasi
select *
from mahasiswa m
    join jurusan j on m.jurusan_id = j.id
where
    j.deleted_at is null;

select *
from mahasiswa m
    join jurusan j on m.jurusan_id = j.id
    and j.deleted_at is null;

select
    m.id as "mahasiswaId",
    m.nama as "mahasiswaNama",
    j.nama as "jurusanNama",
    m.created_at as "tanggalRegistrasi"
from mahasiswa m
    join jurusan j on m.jurusan_id = j.id
    and j.deleted_at is null
where
    m.nama = 'mahasiswa 1';

-- challenge:
-- bisa tidak kita memfilter jurusan dulu
-- baru menjoin ke mahasiswa

-- sub-query
select *
from mahasiswa m
where
    m.jurusan_id in (
        select id
        from jurusan j
        where
            j.deleted_at is null
    );
-- cte
explain
analyze
with
    jurusan_cte as (
        select id, nama
        from jurusan j
        where
            j.deleted_at is null
    )
select
    m.id as "mahasiswaId",
    m.nama as "mahasiswaNama",
    jc.nama as "jurusanNama",
    m.created_at as "tanggalRegistrasi"
from mahasiswa m
    join jurusan_cte jc on m.jurusan_id = jc.id;
-- view
-- materialized view

-- explain analyze

-- hanya ingin menampilkan mahasiswa
-- yang jurusannya 1 dan 3
select *
from mahasiswa m
where
    m.jurusan_id = 1
    or m.jurusan_id = 3;

select * from mahasiswa m;

insert into
    mahasiswa (nama, dob, alamat, jurusan_id)
values (
        md5(random()::text), timestamp '2000-01-10 20:00:00' + random() * (
            timestamp '2000-01-20 20:00:00' - timestamp '2014-01-10 10:00:00'
        ), md5(random()::text), mod(generate_series(1, 1000), 3) + 1
    );
-- update
-- update nama mahasiswa dengan id 1000
-- dengan namanya mahasiswa 1000
update mahasiswa set nama = 'mahasiswa 1000' where id = 1000;

select * from mahasiswa m where m.id = 2000;

-- update mahasiswa dengan id 2000
-- nama mahasiswa 2000 dan alamatnya bsd 2000
update mahasiswa
set
    nama = 'mahasiswa 2000',
    alamat = 'bsd 20000'
where
    id = 2000;

update mahasiswa set nama = 'aku mahasiswa';

select * from mahasiswa m;

-- delete
delete from mahasiswa;

delete from jurusan where id = 2;

select count(*) from mahasiswa m where jurusan_id = 2;

select nextval('mahasiswa_id_seq'::regclass);

commit;

rollback;

create table dummy ( id serial primary key, dummy_r_id int );

create table dummy_r (id serial primary key);

alter table dummy_r add column nama varchar(100);

insert into dummy_r (nama) values ('nama1');

select * from dummy_r dr;

insert into dummy (dummy_r_id) values (1), (2);

select * from dummy d left join dummy_r dr on d.dummy_r_id = dr.id;

delete from dummy_r where id = 1;

CREATE TYPE grade_type AS ENUM('KUIS', 'UTS', 'UAS');

create table mahasiswa_grade (
    id serial primary key, mh_mk_id int not null references r_mahasiswa_mata_kuliah (id), "type" grade_type, grade numeric, created_at TIMESTAMP default now(), updated_at TIMESTAMP default now(), deleted_at TIMESTAMP
);

select * from mahasiswa_grade;

-- masukkan mahasiswa
-- masukkan mata kuliah
-- masukkan mh mk
-- masukkan grade

insert into
    mata_kuliah (nama, jumlah_sks, status)
values ('kalkulus', 4, 'ACTIVE'),
    ('fisika', 4, 'ACTIVE'),
    ('olah raga', 2, 'ACTIVE'),
    ('agama', 2, 'ACTIVE'),
    ('teknologi', 3, 'ACTIVE');

select * from mata_kuliah mk;

-- memasukkan mahasiswa
insert into
    mahasiswa (nama, dob, alamat, jurusan_id)
values (
        md5(random()::text), timestamp '2000-01-10 20:00:00' + random() * (
            timestamp '2000-01-20 20:00:00' - timestamp '2014-01-10 10:00:00'
        ), md5(random()::text), mod(
            generate_series(1, 1000000), 3
        ) + 1
    );