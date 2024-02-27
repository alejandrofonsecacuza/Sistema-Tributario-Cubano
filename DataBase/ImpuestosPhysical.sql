--
-- ER/Studio 8.0 SQL Code Generation
-- Company :      com.AlejandroFonsecaCuza
-- Project :      Impuestos.DM1
-- Author :       Usuario de Windows
--
-- Date Created : Monday, February 12, 2024 19:54:13
-- Target DBMS : MySQL 5.x
--

-- 
-- TABLE: Contribuyentes 
--

CREATE TABLE Contribuyentes(
    RUT                       CHAR(10)    NOT NULL,
    tipoContribuyente         TINYINT     NOT NULL,
    fechaInicioActividades    DATE        NOT NULL,
    PRIMARY KEY (RUT)
)ENGINE=MYISAM
;



-- 
-- TABLE: Empresas 
--

CREATE TABLE Empresas(
    RUT            CHAR(10)    NOT NULL,
    razonSocial    CHAR(50)    NOT NULL,
    PRIMARY KEY (RUT)
)ENGINE=MYISAM
;



-- 
-- TABLE: EntidadesRecaudadoras 
--

CREATE TABLE EntidadesRecaudadoras(
    CodEntidad     CHAR(15)     NOT NULL,
    tipoEntidad    INT          NOT NULL,
    nombre         CHAR(100)    NOT NULL,
    direccion      CHAR(120)    NOT NULL,
    PRIMARY KEY (CodEntidad)
)ENGINE=MYISAM
;



-- 
-- TABLE: Impuestos 
--

CREATE TABLE Impuestos(
    NumeroFormulario    INT          NOT NULL,
    Descripcion         CHAR(250)    NOT NULL,
    PRIMARY KEY (NumeroFormulario)
)ENGINE=MYISAM
;



-- 
-- TABLE: ImpuestosContribuyentes 
--

CREATE TABLE ImpuestosContribuyentes(
    NumeroFormulario    INT         NOT NULL,
    RUT                 CHAR(10)    NOT NULL,
    PRIMARY KEY (NumeroFormulario, RUT)
)ENGINE=MYISAM
;



-- 
-- TABLE: LocalesPago 
--

CREATE TABLE LocalesPago(
    CodEntidad     CHAR(15)    NOT NULL,
    numeroLocal    CHAR(10)    NOT NULL,
    PRIMARY KEY (CodEntidad)
)ENGINE=MYISAM
;



-- 
-- TABLE: OficinasOrganismo 
--

CREATE TABLE OficinasOrganismo(
    CodEntidad          CHAR(15)     NOT NULL,
    Departamento        CHAR(120),
    cantidadEmpleado    INT          NOT NULL,
    PRIMARY KEY (CodEntidad)
)ENGINE=MYISAM
;



-- 
-- TABLE: PagosImpuestos 
--

CREATE TABLE PagosImpuestos(
    CodEntidad          CHAR(15)       NOT NULL,
    fechaPago           DATETIME       NOT NULL,
    NumeroFormulario    INT            NOT NULL,
    RUT                 CHAR(10)       NOT NULL,
    monto               FLOAT(8, 0)    NOT NULL,
    PRIMARY KEY (CodEntidad, fechaPago, NumeroFormulario, RUT)
)ENGINE=MYISAM
;



-- 
-- TABLE: Personas 
--

CREATE TABLE Personas(
    CI           CHAR(11)    NOT NULL,
    nombre       CHAR(30)    NOT NULL,
    apellido1    CHAR(30)    NOT NULL,
    apellido2    CHAR(30),
    telefono     CHAR(30)    NOT NULL,
    PRIMARY KEY (CI)
)ENGINE=MYISAM
;



-- 
-- TABLE: PersonasNaturales 
--

CREATE TABLE PersonasNaturales(
    RUT    CHAR(10)    NOT NULL,
    CI     CHAR(11)    NOT NULL,
    PRIMARY KEY (RUT)
)ENGINE=MYISAM
;



-- 
-- TABLE: TitularEmpesa 
--

CREATE TABLE TitularEmpesa(
    RUT    CHAR(10)    NOT NULL,
    CI     CHAR(11)    NOT NULL,
    PRIMARY KEY (RUT, CI)
)ENGINE=MYISAM
;



-- 
-- TABLE: Empresas 
--

ALTER TABLE Empresas ADD CONSTRAINT RefContribuyentes8 
    FOREIGN KEY (RUT)
    REFERENCES Contribuyentes(RUT)
;


-- 
-- TABLE: ImpuestosContribuyentes 
--

ALTER TABLE ImpuestosContribuyentes ADD CONSTRAINT RefImpuestos24 
    FOREIGN KEY (NumeroFormulario)
    REFERENCES Impuestos(NumeroFormulario)
;

ALTER TABLE ImpuestosContribuyentes ADD CONSTRAINT RefContribuyentes25 
    FOREIGN KEY (RUT)
    REFERENCES Contribuyentes(RUT)
;


-- 
-- TABLE: LocalesPago 
--

ALTER TABLE LocalesPago ADD CONSTRAINT RefEntidadesRecaudadoras13 
    FOREIGN KEY (CodEntidad)
    REFERENCES EntidadesRecaudadoras(CodEntidad)
;


-- 
-- TABLE: OficinasOrganismo 
--

ALTER TABLE OficinasOrganismo ADD CONSTRAINT RefEntidadesRecaudadoras14 
    FOREIGN KEY (CodEntidad)
    REFERENCES EntidadesRecaudadoras(CodEntidad)
;


-- 
-- TABLE: PagosImpuestos 
--

ALTER TABLE PagosImpuestos ADD CONSTRAINT RefEntidadesRecaudadoras21 
    FOREIGN KEY (CodEntidad)
    REFERENCES EntidadesRecaudadoras(CodEntidad)
;

ALTER TABLE PagosImpuestos ADD CONSTRAINT RefImpuestosContribuyentes27 
    FOREIGN KEY (NumeroFormulario, RUT)
    REFERENCES ImpuestosContribuyentes(NumeroFormulario, RUT)
;


-- 
-- TABLE: PersonasNaturales 
--

ALTER TABLE PersonasNaturales ADD CONSTRAINT RefPersonas1 
    FOREIGN KEY (CI)
    REFERENCES Personas(CI)
;

ALTER TABLE PersonasNaturales ADD CONSTRAINT RefContribuyentes2 
    FOREIGN KEY (RUT)
    REFERENCES Contribuyentes(RUT)
;


-- 
-- TABLE: TitularEmpesa 
--

ALTER TABLE TitularEmpesa ADD CONSTRAINT RefEmpresas10 
    FOREIGN KEY (RUT)
    REFERENCES Empresas(RUT)
;

ALTER TABLE TitularEmpesa ADD CONSTRAINT RefPersonas11 
    FOREIGN KEY (CI)
    REFERENCES Personas(CI)
;


