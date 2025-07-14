// src/App.js
import React, { useState } from 'react';
import { Container, Typography, CircularProgress, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { useDataFetching } from './hooks/useDataFetching';

const endpoints = [
    { label: 'Bancos do Brasil', value: 'banks/v1' },
    { label: 'Um banco especifico, ex: CEF', value: 'banks/v1/104' },
    { label: 'Cambio Moedas', value: 'cambio/v1/moedas' },
    { label: 'Cambio: Moeda específica e data específica', value: 'cambio/v1/cotacao/USD/2025-07-10' },
    { label: 'CEP v1', value: 'cep/v1/09920590' },
    { label: 'CEP v2', value: 'cep/v2/09920590' },
    { label: 'CNPJ Exemplo', value: 'cnpj/v1/00360305000104' },
    { label: 'Corretoras (todas)', value: 'cvm/corretoras/v1' },
    { label: 'Corretoras (específica) ex: Nubank', value: 'cvm/corretoras/v1/62169875000179' },

  
  // DDD
  { label: 'Buscar DDD', value: 'ddd/v1/11' },
  
  // Feriados
  { label: 'Feriados nacionais por ano (2025)', value: 'feriados/v1/2025' },
  
  // IBGE
  { label: 'Municípios por UF', value: 'ibge/municipios/v1/SP' },
  { label: 'Informações de UF', value: 'ibge/uf/v1/SP' },
  { label: 'Listar todas as UFs', value: 'ibge/uf/v1' },
  
  // Tabela FIPE
  { label: 'Marcas de carros', value: 'fipe/marcas/v1/carros' },
  { label: 'Marcas de motos', value: 'fipe/marcas/v1/motos' },
  { label: 'Marcas de caminhões', value: 'fipe/marcas/v1/caminhoes' },
  { label: 'Preço FIPE', value: 'fipe/preco/v1/001004-9' },
  { label: 'Tabela FIPE referência', value: 'fipe/tabelas/v1' },
  
  // ISBN
  { label: 'Buscar ISBN', value: 'isbn/v1/9788545702870' },
  
  // Registros BR
  { label: 'Domínios .br', value: 'registrobr/v1/brasilapi.com.br' },
  
  
  // Taxas
  { label: 'Taxas de juros', value: 'taxas/v1' },
  { label: 'Taxa CDI', value: 'taxas/v1/cdi' },
  { label: 'Taxa Selic', value: 'taxas/v1/selic' },
  
  // NCMS
  { label: 'Buscar NCM', value: 'ncm/v1/3305.10.00' },
  { label: 'Listar NCMs', value: 'ncm/v1' },
    
  // PIX
  { label: 'Participantes PIX', value: 'pix/v1/participants' },
];

function App() {
    const [selectedEndpoint, setSelectedEndpoint] = useState(endpoints[0].value);
    const { data, loading, error } = useDataFetching(selectedEndpoint);

    return (
        <Container maxWidth="md">
            <Typography variant="h4" gutterBottom>
                BrasilAPI - Consulta de Endpoints
            </Typography>

            <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel id="endpoint-select-label">Endpoint</InputLabel>
                <Select
                    labelId="endpoint-select-label"
                    value={selectedEndpoint}
                    label="Endpoint"
                    onChange={e => setSelectedEndpoint(e.target.value)}
                >
                    {endpoints.map(ep => (
                        <MenuItem key={ep.value} value={ep.value}>
                            {ep.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            {loading && (
                <Container sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    <CircularProgress />
                </Container>
            )}

            {error && (
                <Typography color="error">Erro: {error}</Typography>
            )}

            {!loading && !error && (
                <pre>{JSON.stringify(data, null, 2)}</pre>
            )}
        </Container>
    );
}

export default App;