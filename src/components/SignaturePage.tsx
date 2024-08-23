import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserSignature: React.FC = () => {
  const [signature, setSignature] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const idNumber = localStorage.getItem('idNumber');
  const idType = localStorage.getItem('idType');

  useEffect(() => {
    const fetchSignature = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:5001/bank/download-signature?idNumber=${idNumber}&idType=${idType}`
        );
        setSignature(response.data);
      } catch (err) {
        setError('No signature found. Would you like to create one?');
        console.error('Error fetching signature:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSignature();
  }, [idNumber, idType]);

  const renewSignature = async () => {
    try {
      setLoading(true);
      const response = await axios.post('http://localhost:5001/bank/renew-signature', {
        idNumber,
        idType,
      });
      setSignature(response.data.sign);
      alert('Signature renewed successfully');
    } catch (err) {
      setError('Error renewing signature');
      console.error('Error renewing signature:', err);
    } finally {
      setLoading(false);
    }
  };

  const downloadSignature = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:5001/bank/download-signature?idNumber=${idNumber}&idType=${idType}`,
        { responseType: 'blob' }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `digital-signature-${idNumber}.pem`);
      document.body.appendChild(link);
      link.click();
    } catch (err) {
      setError('Error downloading signature');
      console.error('Error downloading signature:', err);
    } finally {
      setLoading(false);
    }
  };

  const createSignature = async () => {
    try {
      setLoading(true);
      const response = await axios.post('http://localhost:5001/bank/generate-signature', {
        idNumber,
        idType,
      });
      setSignature(response.data.sign);
      alert('Signature created successfully');
    } catch (err) {
      setError('Error creating signature');
      console.error('Error creating signature:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signature-container">
      <h1>Digital Signature</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {signature ? (
            <>
              <p>Your current signature: {signature}</p>
              <button onClick={renewSignature} disabled={loading}>
                Renew Signature
              </button>
              <button onClick={downloadSignature} disabled={loading}>
                Download Signature
              </button>
            </>
          ) : (
            <>
              <p>{error}</p>
              <button onClick={createSignature} disabled={loading}>
                Create Signature
              </button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default UserSignature;
