'use strict'

// Mengimpor Contract dari fabric-contract-api untuk membuat smart contract
const { Contract } = require('fabric-contract-api')

// Mendefinisikan class TanahContract yang mewarisi Contract
class TanahContract extends Contract {
    // Fungsi untuk menginisialisasi ledger (buku besar)
    async initLedger(ctx) {
        console.log('Initializing ledger...')
    }

    // Fungsi untuk mendaftarkan sertifikat tanah baru
    async registerCertificate(ctx, id, pemilik, lokasi, luas) {
        // Memeriksa apakah sertifikat dengan ID tersebut sudah ada
        const exists = await ctx.stub.getState(id)
        if (exists && exists.length > 0) {
            throw new Error(`Certificate ${id} already exists`)
        }

        // Membuat objek sertifikat baru dengan data yang diberikan
        const certificate = {
            id,                // ID unik sertifikat
            pemilik,          // Nama pemilik tanah
            lokasi,           // Lokasi tanah
            luas,             // Luas tanah
            status: 'active', // Status sertifikat (aktif)
            riwayat: [],      // Array untuk menyimpan riwayat transaksi
            createdAt: new Date().toISOString(),    // Waktu pembuatan
            updatedAt: new Date().toISOString(),    // Waktu terakhir diperbarui
        }

        // Menyimpan sertifikat ke dalam ledger
        await ctx.stub.putState(id, Buffer.from(JSON.stringify(certificate)))
        return certificate
    }

    // Fungsi untuk mentransfer kepemilikan sertifikat
    async transferCertificate(ctx, id, pemilikBaru) {
        // Mengambil data sertifikat dari ledger
        const certificate = await ctx.stub.getState(id)
        if (!certificate || certificate.length === 0) {
            throw new Error(`Certificate ${id} not found`)
        }

        // Mengubah data sertifikat menjadi objek JavaScript
        const certificateJSON = JSON.parse(certificate.toString())
        const pemilikLama = certificateJSON.pemilik

        // Memperbarui pemilik baru
        certificateJSON.pemilikBaru = pemilikBaru;

        // Menambahkan riwayat transfer ke dalam array riwayat
        certificateJSON.riwayat.push({
            tanggal: new Date().toISOString(),  // Waktu transfer
            aksi: 'transfer',                   // Jenis aksi
            dari: pemilikLama,                  // Pemilik lama
            ke: pemilikBaru,                    // Pemilik baru
        })

        // Memperbarui waktu terakhir diperbarui
        certificateJSON.updatedAt = new Date().toISOString()

        // Menyimpan perubahan ke dalam ledger
        await ctx.stub.putState(id, Buffer.from(JSON.stringify(certificateJSON)))
        return certificateJSON
    }

    // Fungsi untuk mendapatkan data sertifikat berdasarkan ID
    async getCertificate(ctx, id) {
        // Mengambil data sertifikat dari ledger
        const certificate = await ctx.stub.getState(id)
        if (!certificate || certificate.length === 0) {
            throw new Error(`Certificate ${id} not found`)
        }
        // Mengembalikan data sertifikat dalam bentuk objek JavaScript
        return JSON.parse(certificate.toString())
    }
}

// Mengekspor class TanahContract agar bisa digunakan di file lain
module.exports = TanahContract