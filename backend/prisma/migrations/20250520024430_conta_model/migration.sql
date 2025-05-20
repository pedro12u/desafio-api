BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[Conta] (
    [idConta] INT NOT NULL IDENTITY(1,1),
    [idPessoa] INT NOT NULL,
    [saldo] FLOAT(53) NOT NULL CONSTRAINT [Conta_saldo_df] DEFAULT 0.0,
    [limiteSaqueDiario] FLOAT(53) NOT NULL,
    [flagAtivo] BIT NOT NULL CONSTRAINT [Conta_flagAtivo_df] DEFAULT 1,
    [tipoConta] INT NOT NULL,
    [dataCriacao] DATETIME2 NOT NULL CONSTRAINT [Conta_dataCriacao_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [Conta_pkey] PRIMARY KEY CLUSTERED ([idConta])
);

-- CreateTable
CREATE TABLE [dbo].[Transacao] (
    [idTransacao] INT NOT NULL IDENTITY(1,1),
    [idConta] INT NOT NULL,
    [valor] FLOAT(53) NOT NULL,
    [dataTransacao] DATETIME2 NOT NULL CONSTRAINT [Transacao_dataTransacao_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [Transacao_pkey] PRIMARY KEY CLUSTERED ([idTransacao])
);

-- AddForeignKey
ALTER TABLE [dbo].[Conta] ADD CONSTRAINT [Conta_idPessoa_fkey] FOREIGN KEY ([idPessoa]) REFERENCES [dbo].[Pessoa]([idPessoa]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Transacao] ADD CONSTRAINT [Transacao_idConta_fkey] FOREIGN KEY ([idConta]) REFERENCES [dbo].[Conta]([idConta]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
